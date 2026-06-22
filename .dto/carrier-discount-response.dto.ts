import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { DiscountScope, DiscountType } from '@prisma/client';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Length,
  Matches,
  Min,
} from 'class-validator';

export class CarrierDiscountTitleResponseDto {
  @ApiProperty({
    description: 'Translation language',
    example: 'uk',
  })
  @IsString()
  @Length(2, 2)
  @Matches(/^[a-z]{2}$/)
  language: string;

  @ApiProperty({
    description: 'Discount title in selected language',
    example: 'Знижка для дітей',
  })
  @IsString()
  discountTitle: string;
}

export class CarrierDiscountDescriptionResponseDto {
  @ApiProperty({
    description: 'Translation language',
    example: 'uk',
  })
  @IsString()
  @Length(2, 2)
  @Matches(/^[a-z]{2}$/)
  language: string;

  @ApiProperty({
    description: 'Discount description in selected language',
    example: 'Дітям до 12 років діє знижка 20%.',
  })
  @IsString()
  discountDescription: string;
}

export class CarrierDiscountResponseDto {
  @ApiProperty({
    description: 'Discount ID',
    example: 1,
  })
  @IsInt()
  @Min(1)
  id: number;

  @ApiProperty({
    description: 'Discount type',
    enum: DiscountType,
    example: DiscountType.PERCENTAGE,
  })
  @IsEnum(DiscountType)
  type: DiscountType;

  @ApiProperty({
    description: 'Discount value as decimal string',
    example: '20.00',
  })
  @IsString()
  value: string;

  @ApiPropertyOptional({
    description: 'Currency code for FIXED_AMOUNT discounts',
    example: 'UAH',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  currencyCode: string | null;

  @ApiPropertyOptional({
    description: 'Discount title in selected language',
    type: CarrierDiscountTitleResponseDto,
    nullable: true,
  })
  title: CarrierDiscountTitleResponseDto | null;

  @ApiPropertyOptional({
    description: 'Discount description in selected language',
    type: CarrierDiscountDescriptionResponseDto,
    nullable: true,
  })
  description: CarrierDiscountDescriptionResponseDto | null;

  @ApiPropertyOptional({
    description: 'Promo code',
    example: 'SUMMER2026',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  code: string | null;

  @ApiPropertyOptional({
    description: 'Maximum number of uses',
    example: 100,
    nullable: true,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  maxUses: number | null;

  @ApiProperty({
    description: 'Used count',
    example: 0,
  })
  @IsInt()
  @Min(0)
  usedCount: number;

  @ApiPropertyOptional({
    description: 'Discount start date',
    nullable: true,
  })
  @IsOptional()
  @IsDate()
  startsAt: Date | null;

  @ApiPropertyOptional({
    description: 'Discount expiration date',
    nullable: true,
  })
  @IsOptional()
  @IsDate()
  expiresAt: Date | null;

  @ApiProperty({
    description: 'Discount active status',
    example: true,
  })
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({
    description: 'Discount scope',
    enum: DiscountScope,
    example: DiscountScope.CARRIER,
  })
  @IsEnum(DiscountScope)
  scope: DiscountScope;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
