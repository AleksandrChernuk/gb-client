import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Type } from 'class-transformer';

import {
  ArticleAuthorResponseDto,
  ArticleDescriptionDto,
  ArticlePhotoResponseDto,
} from './article-fields.dto';

export class ArticleFullResponseDto {
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
    description: 'Localized descriptions and content of the article',
    isArray: true,
    type: () => ArticleDescriptionDto,
  })
  @Type(() => ArticleDescriptionDto)
  descriptions: ArticleDescriptionDto[];

  @ApiProperty({
    description: 'Photos related to the article',
    type: () => ArticlePhotoResponseDto,
    isArray: true,
  })
  @Type(() => ArticlePhotoResponseDto)
  photos: ArticlePhotoResponseDto[];

  @ApiPropertyOptional({
    description: 'Related country ID',
    example: 17,
    nullable: true,
  })
  countryId: number | null;

  @ApiPropertyOptional({
    description: 'Related location ID',
    example: 125,
    nullable: true,
  })
  locationId: number | null;

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
