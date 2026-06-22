import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ManualRouteStatus } from '@prisma/client';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Matches,
  Min,
} from 'class-validator';

export class CarrierRouteNameResponseDto {
  @ApiProperty({
    description: 'Translation language',
    example: 'uk',
  })
  @IsString()
  @Length(2, 2)
  @Matches(/^[a-z]{2}$/)
  language: string;

  @ApiProperty({
    description: 'Route name in selected language',
    example: 'Київ — Варшава',
  })
  @IsString()
  routeName: string;
}

export class CarrierRouteResponseDto {
  @ApiProperty({
    description: 'Manual route ID',
    example: 'c51a68ef-dc0f-46fd-b706-3d877b57970a',
  })
  @IsUUID()
  id: string;

  @ApiPropertyOptional({
    description: 'Internal carrier route number',
    example: 'UA-PL-001',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  number: string | null;

  @ApiPropertyOptional({
    description: 'Route name in selected language',
    type: CarrierRouteNameResponseDto,
    nullable: true,
  })
  name: CarrierRouteNameResponseDto | null;

  @ApiProperty({
    description: 'Departure location ID',
    example: 1,
  })
  @IsInt()
  @Min(1)
  departureLocationId: number;

  @ApiProperty({
    description: 'Arrival location ID',
    example: 2,
  })
  @IsInt()
  @Min(1)
  arrivalLocationId: number;

  @ApiProperty({
    description: 'Route currency code',
    example: 'UAH',
  })
  @IsString()
  currencyCode: string;

  @ApiProperty({
    description: 'Card payment is allowed by default',
    example: true,
  })
  @IsBoolean()
  defaultAllowCardPayment: boolean;

  @ApiProperty({
    description: 'Boarding payment is allowed by default',
    example: false,
  })
  @IsBoolean()
  defaultAllowBoardingPayment: boolean;

  @ApiPropertyOptional({
    description: 'Default bus ID',
    example: 5,
    nullable: true,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  busId: number | null;

  @ApiPropertyOptional({
    description: 'Insurer ID',
    example: 'c51a68ef-dc0f-46fd-b706-3d877b57970a',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  insurerId: string | null;

  @ApiProperty({
    description: 'Sales cutoff in minutes before departure',
    example: 30,
  })
  @IsInt()
  @Min(0)
  salesCutoffMinutes: number;

  @ApiProperty({
    description: 'Manual route status',
    enum: ManualRouteStatus,
    example: ManualRouteStatus.ACTIVE,
  })
  @IsEnum(ManualRouteStatus)
  status: ManualRouteStatus;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
