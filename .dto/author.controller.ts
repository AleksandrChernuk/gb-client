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

import { AuthorService } from './author.service';

import { Auth } from '../auth_entities/auth/decorators/auth.decorator';
import { MinRole } from '../auth_entities/auth/decorators/min-role.decorator';

import { AuthorsQueryDto } from './dto/authors-query.dto';
import { CreateAuthorDto } from './dto/author-create.dto';
import { UpdateAuthorDto } from './dto/author-update.dto';
import { AuthorFullResponseDto } from './dto/author-full-response.dto';
import { AuthorLanguageQueryDto } from './dto/author-language-query.dto';
import { AuthorsQueryResponseDto } from './dto/authors-query-response.dto';

@ApiTags('Authors')
@Controller('authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  // ================ Получить всех авторов ================
  @Auth()
  @MinRole('EDITOR')
  @Get()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Get all authors',
    description:
      'Returns lightweight paginated authors. Supports search by translated author name.',
  })
  @ApiOkResponse({
    description: 'Paginated lightweight list of authors.',
    type: AuthorsQueryResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid query parameters.',
  })
  async getAll(
    @Query() queryDto: AuthorsQueryDto,
  ): Promise<AuthorsQueryResponseDto> {
    return this.authorService.getAuthors(queryDto);
  }

  // ================ Получить автора по slug ================
  @Get('slug/:slug')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Get author by slug',
    description:
      'Returns extended author object by slug with localized name, role, bio, credentials, social links and articles.',
  })
  @ApiParam({
    name: 'slug',
    description: 'Author slug',
    example: 'olena-kovalchuk-1',
  })
  @ApiOkResponse({
    description: 'Extended author details.',
    type: AuthorFullResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid author slug or query parameters.',
  })
  @ApiNotFoundResponse({
    description: 'Author not found.',
  })
  async getBySlug(
    @Param('slug') slug: string,
    @Query() queryDto: AuthorLanguageQueryDto,
  ): Promise<AuthorFullResponseDto> {
    return this.authorService.getAuthorBySlug(slug, queryDto);
  }

  // ================ Получить автора по ID ================
  @Auth()
  @MinRole('EDITOR')
  @Get(':authorId')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Get author by ID',
    description:
      'Returns extended author object with localized name, role, bio, credentials, social links and articles.',
  })
  @ApiParam({
    name: 'authorId',
    description: 'Author ID',
    example: 5,
  })
  @ApiOkResponse({
    description: 'Extended author details.',
    type: AuthorFullResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid author ID or query parameters.',
  })
  @ApiNotFoundResponse({
    description: 'Author not found.',
  })
  async getById(
    @Param('authorId', ParseIntPipe)
    authorId: number,
    @Query() queryDto: AuthorLanguageQueryDto,
  ): Promise<AuthorFullResponseDto> {
    return this.authorService.getAuthorById(authorId, queryDto);
  }

  // ================ Создать автора ================
  @Auth()
  @MinRole('EDITOR')
  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Create author' })
  @ApiCreatedResponse({
    description: 'Author successfully created.',
  })
  @ApiBadRequestResponse({
    description: 'Invalid author data.',
  })
  @ApiConflictResponse({
    description: 'Author with the same unique data already exists.',
  })
  async create(@Body() dto: CreateAuthorDto) {
    return this.authorService.createAuthor(dto);
  }

  // ================ Обновить автора ================
  @Auth()
  @MinRole('EDITOR')
  @Patch(':authorId')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Update author',
    description:
      'Partially updates a author. Only provided fields are changed.',
  })
  @ApiParam({
    name: 'authorId',
    description: 'Author ID',
    example: 5,
  })
  @ApiOkResponse({
    description: 'Author successfully updated.',
  })
  @ApiBadRequestResponse({
    description: 'Invalid author ID, request body or empty PATCH request.',
  })
  @ApiNotFoundResponse({
    description: 'Author not found.',
  })
  @ApiConflictResponse({
    description: 'Author with the same unique data already exists.',
  })
  async update(
    @Param('authorId', ParseIntPipe)
    authorId: number,
    @Body() dto: UpdateAuthorDto,
  ) {
    return this.authorService.updateAuthor(authorId, dto);
  }

  // ============== Удалить автора по ID ==============
  @Auth()
  @MinRole('EDITOR')
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete author by ID' })
  @ApiNoContentResponse({ description: 'Author successfully deleted' })
  @ApiNotFoundResponse({ description: 'Author not found' })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.authorService.deleteAuthor(id);
  }
}
