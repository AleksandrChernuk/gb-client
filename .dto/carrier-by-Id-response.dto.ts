import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

import {
  BaggagePolicyStatus,
  CarrierStatus,
  RefundPolicyStatus,
} from '@prisma/client';

import {
  CarrierAddressTranslationDto,
  CarrierCurrenciesDto,
  CarrierDescriptionTranslationDto,
  CarrierNameTranslationDto,
} from './carrier-create.dto';
import { CarrierDiscountResponseDto } from './carrier-discount-response.dto';
import { CarrierRouteResponseDto } from './carrier-route-response.dto';

class CarrierBusResponseDto {
  @ApiProperty({
    description: 'Carrier bus ID',
    example: 5,
  })
  @IsInt()
  @Min(1)
  id: number;

  @ApiProperty({
    description: 'Carrier bus name',
    example: 'Mercedes',
  })
  @IsString()
  name: string;
}

class CarrierBaggageRuleTranslationResponseDto {
  @ApiProperty({
    description: 'Translation language',
    example: 'uk',
  })
  @IsString()
  language: string;

  @ApiProperty({
    description: 'Baggage rule in selected language',
    example: 'Пасажир може перевозити одну валізу до 20 кг.',
  })
  @IsString()
  rule: string;
}

class CarrierBaggagePolicyResponseDto {
  @ApiProperty({
    description: 'Baggage policy ID',
    example: 1,
  })
  @IsInt()
  @Min(1)
  id: number;

  @ApiProperty({
    description: 'Baggage policy status',
    enum: BaggagePolicyStatus,
    example: BaggagePolicyStatus.ACTIVE,
  })
  @IsEnum(BaggagePolicyStatus)
  status: BaggagePolicyStatus;

  @ApiPropertyOptional({
    description: 'Baggage rule in selected language',
    type: CarrierBaggageRuleTranslationResponseDto,
    nullable: true,
  })
  rule: CarrierBaggageRuleTranslationResponseDto | null;
}

class CarrierRefundRuleDescriptionResponseDto {
  @ApiProperty({
    description: 'Translation language',
    example: 'uk',
  })
  @IsString()
  language: string;

  @ApiProperty({
    description: 'Refund rule in selected language',
    example: 'Скасування за 24 години до відправлення - повернення 75%.',
  })
  @IsString()
  rule: string;
}

class CarrierRefundPolicyTierResponseDto {
  @ApiProperty({
    description: 'Hours before departure',
    example: 24,
  })
  @IsInt()
  @Min(1)
  hoursBeforeDeparture: number;

  @ApiProperty({
    description: 'Refund percentage',
    example: 75,
  })
  @IsInt()
  @Min(0)
  refundPercentage: number;

  @ApiPropertyOptional({
    description: 'Refund rule description in selected language',
    type: CarrierRefundRuleDescriptionResponseDto,
    nullable: true,
  })
  description: CarrierRefundRuleDescriptionResponseDto | null;
}

class CarrierRefundPolicyResponseDto {
  @ApiProperty({
    description: 'Refund policy ID',
    example: 1,
  })
  @IsInt()
  @Min(1)
  id: number;

  @ApiProperty({
    description: 'Refund policy status',
    enum: RefundPolicyStatus,
    example: RefundPolicyStatus.ACTIVE,
  })
  @IsEnum(RefundPolicyStatus)
  status: RefundPolicyStatus;

  @ApiProperty({
    description: 'Refund policy tiers',
    type: [CarrierRefundPolicyTierResponseDto],
  })
  tiers: CarrierRefundPolicyTierResponseDto[];
}

export class CarrierByIdResponseDto {
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
    description: 'Carrier name in selected language',
    type: CarrierNameTranslationDto,
    nullable: true,
  })
  name: CarrierNameTranslationDto | null;

  @ApiPropertyOptional({
    description: 'Carrier description in selected language',
    type: CarrierDescriptionTranslationDto,
    nullable: true,
  })
  description: CarrierDescriptionTranslationDto | null;

  @ApiPropertyOptional({
    description: 'Carrier address in selected language',
    type: CarrierAddressTranslationDto,
    nullable: true,
  })
  address: CarrierAddressTranslationDto | null;

  @ApiProperty({
    description: 'Carrier phone numbers list',
    example: ['+380671234567', '+380671234568'],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  phones: string[];

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
    description: 'Carrier payment currencies list',
    type: [CarrierCurrenciesDto],
  })
  currencies: CarrierCurrenciesDto[];

  @ApiProperty({
    description: 'Default carrier currency code in ISO 4217 format',
    example: 'UAH',
  })
  @IsString()
  defaultCurrencyCode: string;

  @ApiProperty({
    description: 'Card payment is allowed by default',
    example: false,
  })
  @IsBoolean()
  defaultAllowCardPayment: boolean;

  @ApiProperty({
    description: 'Boarding payment is allowed by default',
    example: true,
  })
  @IsBoolean()
  defaultAllowBoardingPayment: boolean;

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

  @ApiProperty({
    description: 'Carrier buses list',
    type: [CarrierBusResponseDto],
  })
  buses: CarrierBusResponseDto[];

  @ApiProperty({
    description: 'Carrier baggage policies',
    type: [CarrierBaggagePolicyResponseDto],
  })
  baggageRules: CarrierBaggagePolicyResponseDto[];

  @ApiProperty({
    description: 'Carrier refund policies',
    type: [CarrierRefundPolicyResponseDto],
  })
  refundPolicies: CarrierRefundPolicyResponseDto[];

  @ApiProperty({
    description: 'Carrier discounts only',
    type: [CarrierDiscountResponseDto],
  })
  discounts: CarrierDiscountResponseDto[];

  @ApiProperty({
    description: 'Carrier manual routes only',
    type: [CarrierRouteResponseDto],
  })
  routes: CarrierRouteResponseDto[];

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  createdAt: Date;
}
