import { ApiPropertyOptional, OmitType, PartialType } from '@nestjs/swagger';
import { CarrierStatus } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsString,
  IsUrl,
  MaxLength,
  ValidateIf,
} from 'class-validator';

import { CreateCarrierDto } from './carrier-create.dto';

class UpdateCarrierBaseDto extends PartialType(
  OmitType(CreateCarrierDto, ['logo', 'legalIdentifier'] as const),
) {}

export class UpdateCarrierDto extends UpdateCarrierBaseDto {
  @ApiPropertyOptional({
    description:
      'Carrier logo URL. Pass null to remove the current carrier logo',
    example:
      'https://res.cloudinary.com/example/image/upload/carriers/logo.webp',
    format: 'uri',
    maxLength: 2048,
    nullable: true,
  })
  @ValidateIf(
    (_object, value: unknown) => value !== undefined && value !== null,
  )
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsUrl(
    {
      protocols: ['https'],
      require_protocol: true,
      require_valid_protocol: true,
    },
    {
      message: 'logo must be a valid HTTPS URL',
    },
  )
  @MaxLength(2048)
  logo?: string | null;

  @ApiPropertyOptional({
    description:
      'Carrier legal identifier. Pass null to remove the current identifier',
    example: '20077720',
    nullable: true,
  })
  @ValidateIf(
    (_object, value: unknown) => value !== undefined && value !== null,
  )
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @MaxLength(100)
  legalIdentifier?: string | null;

  // Обновление статуса перевозчика: ACTIVE - показывается в системе, INACTIVE - не показывается
  @ApiPropertyOptional({
    description: 'Carrier status',
    enum: CarrierStatus,
    example: CarrierStatus.ACTIVE,
  })
  @ValidateIf((_object, value: unknown) => value !== undefined)
  @IsEnum(CarrierStatus)
  status?: CarrierStatus;
}
