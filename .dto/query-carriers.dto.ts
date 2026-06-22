import { ApiPropertyOptional } from '@nestjs/swagger';
import { CarrierStatus } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

import { CarrierLanguageQueryDto } from './carrier-language-query.dto';

export class QueryCarriersDto extends CarrierLanguageQueryDto {
  @ApiPropertyOptional({
    description: 'Search query for carrier name',
    example: 'Best Carrier',
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
    description: 'Filter carriers by status',
    enum: CarrierStatus,
    example: CarrierStatus.ACTIVE,
  })
  @Transform(({ value }) => {
    if (typeof value !== 'string') {
      return value;
    }

    const normalizedValue = value.trim();

    return normalizedValue === '' ? undefined : normalizedValue;
  })
  @IsOptional()
  @IsEnum(CarrierStatus)
  status?: CarrierStatus;

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
