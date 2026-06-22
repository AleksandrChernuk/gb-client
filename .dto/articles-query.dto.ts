import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

import { ArticleLanguageQueryDto } from './article-language-query.dto';

export class FindArticlesQueryDto extends ArticleLanguageQueryDto {
  @ApiPropertyOptional({
    default: 1,
    minimum: 1,
  })
  @IsOptional()
  @Transform(({ value }) => {
    const numberValue = Number(value);

    return Number.isInteger(numberValue) && numberValue > 0 ? numberValue : 1;
  })
  @IsInt({ message: 'Page must be an integer' })
  @Min(1, { message: 'Page must be at least 1' })
  page?: number;

  @ApiPropertyOptional({
    default: 50,
    minimum: 1,
    maximum: 100,
  })
  @IsOptional()
  @Transform(({ value }) => {
    const numberValue = Number(value);

    return Number.isInteger(numberValue) && numberValue > 0 ? numberValue : 50;
  })
  @IsInt({ message: 'PerPage must be an integer' })
  @Min(1, { message: 'PerPage must be at least 1' })
  @Max(100, { message: 'PerPage must be no more than 100' })
  perPage?: number;

  @ApiPropertyOptional({
    description: 'Filter by country ID',
    example: 17,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'countryId must be an integer' })
  @Min(1, { message: 'countryId must be at least 1' })
  countryId?: number;

  @ApiPropertyOptional({
    description: 'Filter by location ID',
    example: 125,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'locationId must be an integer' })
  @Min(1, { message: 'locationId must be at least 1' })
  locationId?: number;

  @ApiPropertyOptional({
    description: 'Filter by author ID',
    example: 5,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'authorId must be an integer' })
  @Min(1, { message: 'authorId must be at least 1' })
  authorId?: number;

  @ApiPropertyOptional({
    description: 'Filter by hashtag',
    example: 'antalya',
  })
  @Transform(({ value }) => {
    if (typeof value !== 'string') {
      return value;
    }

    const normalizedValue = value.trim().replace(/^#+/, '').toLowerCase();

    return normalizedValue === '' ? undefined : normalizedValue;
  })
  @IsOptional()
  @IsString({ message: 'hashtag must be a string' })
  hashtag?: string;
}
