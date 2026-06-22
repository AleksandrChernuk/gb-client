import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Transform, Type } from 'class-transformer';
import {
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsBoolean,
  IsISO4217CurrencyCode,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  Matches,
  MaxLength,
  ValidateNested,
} from 'class-validator';

export class CarrierNameTranslationDto {
  @ApiProperty({
    description: 'Language of the translation',
    example: 'en',
    minLength: 2,
    maxLength: 2,
  })
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim().toLowerCase() : value,
  )
  @IsString()
  @Length(2, 2)
  @Matches(/^[a-z]{2}$/, {
    message: 'language must be a two-letter lowercase language code',
  })
  language: string;

  @ApiProperty({
    description: 'Name of the carrier in the specified language',
    example: 'Best Carrier UA',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsNotEmpty()
  carrierName: string;
}

export class CarrierDescriptionTranslationDto {
  @ApiProperty({
    description: 'Language of the translation',
    example: 'en',
    minLength: 2,
    maxLength: 2,
  })
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim().toLowerCase() : value,
  )
  @IsString()
  @Length(2, 2)
  @Matches(/^[a-z]{2}$/, {
    message: 'language must be a two-letter lowercase language code',
  })
  language: string;

  @ApiProperty({
    description: 'Carrier description in the specified language',
    example:
      'Best Carrier UA has been providing domestic and international passenger transportation for over 20 years.',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsNotEmpty()
  carrierDescription: string;
}

export class CarrierAddressTranslationDto {
  @ApiProperty({
    description: 'Language of the translation',
    example: 'en',
    minLength: 2,
    maxLength: 2,
  })
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim().toLowerCase() : value,
  )
  @IsString()
  @Length(2, 2)
  @Matches(/^[a-z]{2}$/, {
    message: 'language must be a two-letter lowercase language code',
  })
  language: string;

  @ApiProperty({
    description: 'Carrier address in the specified language',
    example: '02073, Shevchenko blv, 15, Kyiv, Ukraine.',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsNotEmpty()
  carrierAddress: string;
}

export class CarrierCurrenciesDto {
  @ApiProperty({
    description: 'Carrier payment currency',
    example: 'UAH',
    minLength: 3,
    maxLength: 3,
  })
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim().toUpperCase() : value,
  )
  @IsString()
  @Length(3, 3)
  @IsISO4217CurrencyCode({
    message: 'currencyCode must be a valid ISO 4217 currency code',
  })
  currencyCode: string;
}

export class CreateCarrierDto {
  @ApiProperty({ description: 'Carrier slug', example: 'best-carrier-ua' })
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim().toLowerCase() : value,
  )
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      'Slug must contain only lowercase latin letters, numbers and single hyphens between words.',
  })
  slug: string;

  @ApiProperty({
    description: 'Carrier name translations',
    type: [CarrierNameTranslationDto],
  })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayUnique((item: CarrierNameTranslationDto) => item.language)
  @ValidateNested({ each: true })
  @Type(() => CarrierNameTranslationDto)
  name: CarrierNameTranslationDto[];

  @ApiPropertyOptional({
    description: 'Carrier description translations',
    type: [CarrierDescriptionTranslationDto],
  })
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ArrayUnique((item: CarrierDescriptionTranslationDto) => item.language)
  @ValidateNested({ each: true })
  @Type(() => CarrierDescriptionTranslationDto)
  description?: CarrierDescriptionTranslationDto[];

  @ApiPropertyOptional({
    description: 'Carrier address translations',
    type: [CarrierAddressTranslationDto],
  })
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ArrayUnique((item: CarrierAddressTranslationDto) => item.language)
  @ValidateNested({ each: true })
  @Type(() => CarrierAddressTranslationDto)
  address?: CarrierAddressTranslationDto[];

  // Массив номеров телефона
  @ApiPropertyOptional({
    description: 'Carrier phone numbers list',
    example: ['+380671234567', '+380671234568'],
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Matches(/^\+[1-9]\d{7,14}$/, {
    each: true,
    message:
      'Each phone number must be in international E.164 format, for example: +380671234567',
  })
  phones?: string[];

  // Ссылка на изображение лого
  @ApiPropertyOptional({
    description: 'Carrier logo url',
    example:
      'https://res.cloudinary.com/example/image/upload/v1234567890/carriers/logo.webp',
    format: 'uri',
    maxLength: 2048,
  })
  @IsOptional()
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
  logo?: string;

  // Регистрационный номер перевозчика
  @ApiPropertyOptional({
    description: 'Carrier legal identifier',
    example: '20077720',
  })
  @IsOptional()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @MaxLength(100)
  legalIdentifier?: string;

  // Список валют для оплаты
  @ApiProperty({
    description: 'Carrier payment currencies list',
    type: [CarrierCurrenciesDto],
  })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayUnique((item: CarrierCurrenciesDto) => item.currencyCode)
  @ValidateNested({ each: true })
  @Type(() => CarrierCurrenciesDto)
  currencies: CarrierCurrenciesDto[];

  //! Дефолтная валюта оплаты перевозчика - выбрать одну из списка валют!
  @ApiProperty({
    description: 'Default carrier currency code in ISO 4217 format',
    example: 'UAH',
    type: String,
    minLength: 3,
    maxLength: 3,
  })
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim().toUpperCase() : value,
  )
  @IsString()
  @IsISO4217CurrencyCode({
    message: 'defaultCurrencyCode must be a valid ISO 4217 currency code',
  })
  defaultCurrencyCode: string;

  // Возможна ли оплата картой у перевозчика (по дефолту - false)
  @ApiPropertyOptional({
    description: 'Card payment is allowed by default',
    example: false,
    default: false,
    type: Boolean,
  })
  @IsOptional()
  @IsBoolean()
  defaultAllowCardPayment?: boolean;

  // Возможна ли оплата при посадке у перевозчика (по дефолту - true)
  @ApiPropertyOptional({
    description: 'Boarding payment is allowed by default',
    example: true,
    default: true,
    type: Boolean,
  })
  @IsOptional()
  @IsBoolean()
  defaultAllowBoardingPayment?: boolean;
}
