import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';

import { CarrierStatus } from '@prisma/client';

import {
  CarrierAddressTranslationDto,
  CarrierNameTranslationDto,
} from './carrier-create.dto';

// Облегченный объект перевозчика для списка перевозчиков.
export class CarrierSimpleResponseDto {
  @ApiProperty({
    description: 'Carrier ID',
    example: 'c51a68ef-dc0f-46fd-b706-3d877b57970a',
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    description: 'Carrier slug',
    example: 'best-carrier-ua',
  })
  @IsString()
  slug: string;

  @ApiPropertyOptional({
    description: 'Carrier logo URL',
    example:
      'https://res.cloudinary.com/example/image/upload/v1234567890/carriers/logo.webp',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  logo: string | null;

  @ApiPropertyOptional({
    description: 'Carrier legal identifier',
    example: '20077720',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  legalIdentifier: string | null;

  @ApiProperty({
    description: 'Carrier status',
    enum: CarrierStatus,
    example: CarrierStatus.ACTIVE,
  })
  @IsEnum(CarrierStatus)
  status: CarrierStatus;

  @ApiProperty({
    description: 'Average carrier rating represented as decimal string',
    example: '4.75',
  })
  @IsString()
  ratingAverage: string;

  @ApiPropertyOptional({
    description: 'Carrier name in selected language',
    type: CarrierNameTranslationDto,
    nullable: true,
  })
  name: CarrierNameTranslationDto | null;

  @ApiPropertyOptional({
    description: 'Carrier address in selected language',
    type: CarrierAddressTranslationDto,
    nullable: true,
  })
  address: CarrierAddressTranslationDto | null;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  createdAt: Date;
}
