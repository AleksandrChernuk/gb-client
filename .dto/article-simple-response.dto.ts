import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Type } from 'class-transformer';

import {
  ArticleAuthorResponseDto,
  ArticleOnePhotoResponseDto,
  ArticleTextsResponseDto,
} from './article-fields.dto';

export class ArticleSimpleResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty({
    description: 'Unique slug for the article (used in URLs)',
    example: 'travel-to-antalya-complete-guide',
  })
  slug: string;

  @ApiProperty({
    description: 'List of hashtags for filtering and search',
    example: ['turkey', 'antalya', 'sea', 'bus-tickets'],
    isArray: true,
    type: String,
  })
  hashtags: string[];

  @ApiProperty({
    description: 'Localized title, teaser and SEO fields of the article',
    type: () => ArticleTextsResponseDto,
  })
  @Type(() => ArticleTextsResponseDto)
  texts: ArticleTextsResponseDto;

  @ApiPropertyOptional({
    description: 'Cover or first article photo',
    type: () => ArticleOnePhotoResponseDto,
    nullable: true,
  })
  @Type(() => ArticleOnePhotoResponseDto)
  photo: ArticleOnePhotoResponseDto | null;

  @ApiPropertyOptional({
    description: 'Related author ID',
    example: 5,
    nullable: true,
  })
  authorId: number | null;

  @ApiPropertyOptional({
    description: 'Related author in selected language',
    type: () => ArticleAuthorResponseDto,
    nullable: true,
  })
  @Type(() => ArticleAuthorResponseDto)
  author: ArticleAuthorResponseDto | null;

  @ApiProperty({
    description: 'Average article rating represented as decimal string',
    example: '4.75',
  })
  @IsString()
  ratingAverage: string;

  @ApiProperty({
    type: String,
    format: 'date-time',
    description: 'Creation timestamp',
  })
  @Type(() => Date)
  createdAt: Date;

  @ApiProperty({
    type: String,
    format: 'date-time',
    description: 'Last update timestamp',
  })
  @Type(() => Date)
  updatedAt: Date;
}
