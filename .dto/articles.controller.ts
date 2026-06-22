import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { Auth } from '../auth_entities/auth/decorators/auth.decorator';
import { MinRole } from '../auth_entities/auth/decorators/min-role.decorator';

import { UpdateArticleDto } from './dto/article-update.dto';
import { CreateArticleDto } from './dto/article-create.dto';
import { FindArticlesQueryDto } from './dto/articles-query.dto';
import { ArticleFullResponseDto } from './dto/article-full-response.dto';
import { ArticlesQueryResponseDto } from './dto/articles-query-response.dto';
import { ArticleLanguageQueryDto } from './dto/article-language-query.dto';
import { ArticlesService } from './article.service';

@ApiTags('Articles')
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  // ============== Получить список статей ==============
  @Get()
  @ApiOperation({
    summary: 'List all articles with pagination and filters',
  })
  @ApiOkResponse({
    description: 'List of articles with pagination',
    type: ArticlesQueryResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid query parameters.',
  })
  async findAll(
    @Query() queryDto: FindArticlesQueryDto,
  ): Promise<ArticlesQueryResponseDto> {
    return this.articlesService.getArticles(queryDto);
  }

  // ============== Получить статью по slug ===============
  @Get(':slug')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get article by slug' })
  @ApiParam({
    name: 'slug',
    description: 'Article slug',
    example: 'travel-kyiv-warsaw',
  })
  @ApiOkResponse({
    description: 'Article found',
    type: ArticleFullResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid article slug or query parameters.',
  })
  @ApiNotFoundResponse({
    description: 'Article not found.',
  })
  async getBySlug(
    @Param('slug') slug: string,
    @Query() queryDto: ArticleLanguageQueryDto,
  ): Promise<ArticleFullResponseDto> {
    return this.articlesService.getArticleBySlug(slug, queryDto);
  }

  // ============== Получить статью по ID ==============
  @Auth()
  @MinRole('EDITOR')
  @Get('by-id/:articleId')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get article by ID' })
  @ApiParam({
    name: 'articleId',
    description: 'Article ID',
    example: 5,
  })
  @ApiOkResponse({
    description: 'Extended article details.',
    type: ArticleFullResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid article ID or query parameters.',
  })
  @ApiNotFoundResponse({
    description: 'Article not found.',
  })
  async getById(
    @Param('articleId', ParseIntPipe) articleId: number,
    @Query() queryDto: ArticleLanguageQueryDto,
  ): Promise<ArticleFullResponseDto> {
    return this.articlesService.getArticleById(articleId, queryDto);
  }

  // ================== Создать статью ==================
  @Auth()
  @MinRole('EDITOR')
  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Create a new article' })
  @ApiCreatedResponse({
    description: 'Article successfully created',
  })
  @ApiBadRequestResponse({ description: 'Invalid article data.' })
  @ApiConflictResponse({ description: 'Article with this slug already exists' })
  async create(@Body() dto: CreateArticleDto) {
    return this.articlesService.createArticle(dto);
  }

  // ============== Обновить статью ==============
  @Auth()
  @MinRole('EDITOR')
  @Patch('by-id/:articleId')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Update article by ID',
    description:
      'Partially updates a article. Only provided fields are changed.',
  })
  @ApiParam({
    name: 'articleId',
    description: 'Article ID',
    example: 5,
  })
  @ApiOkResponse({
    description: 'Article successfully updated',
  })
  @ApiBadRequestResponse({
    description: 'Invalid article ID, request body or empty PATCH request.',
  })
  @ApiNotFoundResponse({
    description: 'Article not found.',
  })
  @ApiConflictResponse({
    description: 'Article with the same unique data already exists.',
  })
  async update(
    @Param('articleId', ParseIntPipe) articleId: number,
    @Body() dto: UpdateArticleDto,
  ) {
    return this.articlesService.updateArticle(articleId, dto);
  }

  // ============== Удалить статью ==============
  @Auth()
  @MinRole('EDITOR')
  @Delete('by-id/:articleId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete article by ID' })
  @ApiNoContentResponse({ description: 'Article successfully deleted' })
  @ApiNotFoundResponse({ description: 'Article not found' })
  async delete(
    @Param('articleId', ParseIntPipe) articleId: number,
  ): Promise<void> {
    await this.articlesService.deleteArticle(articleId);
  }
}
