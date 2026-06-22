import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

import {
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

import { AuthorLanguageQueryDto } from './author-language-query.dto';

export class AuthorsQueryDto extends AuthorLanguageQueryDto {
  @ApiPropertyOptional({
    description: 'Search query for author name',
    example: 'Olena',
    maxLength: 200,
  })
  @Transform(({ value }) => {
    if (typeof value !== 'string') {
      return value;
    }

    const normalizedValue = value.trim();

    return normalizedValue === '' ? undefined : normalizedValue;
  })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  query?: string;

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
}
