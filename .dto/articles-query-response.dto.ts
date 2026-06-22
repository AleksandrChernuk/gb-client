import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { ArticleSimpleResponseDto } from './article-simple-response.dto';

export class ArticlesQueryResponseDto {
  @ApiProperty({
    description: 'List of articles',
    type: () => ArticleSimpleResponseDto,
    isArray: true,
  })
  @Type(() => ArticleSimpleResponseDto)
  data: ArticleSimpleResponseDto[];

  @ApiProperty({
    example: 120,
  })
  totalArticles: number;

  @ApiProperty({
    example: 1,
  })
  page: number;

  @ApiProperty({
    example: 50,
  })
  perPage: number;

  @ApiProperty({
    example: 3,
  })
  totalPages: number;
}
