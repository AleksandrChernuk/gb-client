// import {
//   IsBoolean,
//   IsDateString,
//   IsNotEmpty,
//   IsNumber,
//   IsOptional,
//   IsString,
//   ValidateNested,
// } from 'class-validator';
// import { Type } from 'class-transformer';
// import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// class SeatDto {
//   @ApiPropertyOptional({ description: 'Seat ID' })
//   @IsNumber()
//   @IsOptional()
//   seat_id?: number;

//   @ApiPropertyOptional({ description: 'Seat Number' })
//   @IsNumber()
//   @IsOptional()
//   seat_number?: number;
// }

// class DiscountDto {
//   @ApiProperty({ description: 'Discount ID' })
//   @IsString()
//   @IsOptional()
//   discount_id: string;

//   @ApiPropertyOptional({ description: 'Discount description' })
//   @IsString()
//   @IsOptional()
//   discount_description?: string;

//   @ApiPropertyOptional({ description: 'Discount percent' })
//   @IsNumber()
//   @IsOptional()
//   discount_percent?: number;
// }

// export class CreateTicketDto {
//   @ApiProperty({ description: 'First name' })
//   @IsString()
//   @IsNotEmpty({ message: 'First name is required' })
//   first_name: string;

//   @ApiProperty({ description: 'Last name' })
//   @IsString()
//   @IsNotEmpty({ message: 'Last name is required' })
//   last_name: string;

//   @ApiPropertyOptional({ description: 'Middlename' })
//   @IsString()
//   @IsOptional()
//   middlename?: string;

//   @ApiProperty({ description: 'Birthdate', example: '2000-01-01' })
//   @IsDateString()
//   @IsNotEmpty({ message: 'Birth date is required' })
//   birthdate: string;

//   @ApiProperty({ description: 'Document type (number)' })
//   @IsNumber()
//   @IsNotEmpty({ message: 'Document type is required' })
//   document_type: number;

//   @ApiProperty({ description: 'Document number' })
//   @IsString()
//   @IsNotEmpty({ message: 'Document number is required' })
//   document_number: string;

//   @ApiPropertyOptional({
//     description: 'Document expiration date',
//     example: '2030-12-31',
//   })
//   @IsDateString()
//   @IsOptional()
//   document_expire_at?: string;

//   @ApiPropertyOptional({ description: 'Gender: M or F', enum: ['M', 'F'] })
//   @IsString()
//   @IsOptional()
//   gender?: 'M' | 'F';

//   @ApiPropertyOptional({ description: 'Seat info', type: () => SeatDto })
//   @ValidateNested()
//   @Type(() => SeatDto)
//   @IsOptional()
//   seat?: SeatDto;

//   @ApiProperty({ description: 'Discount info', type: () => DiscountDto })
//   @ValidateNested()
//   @Type(() => DiscountDto)
//   @IsOptional()
//   discount?: DiscountDto;

//   @ApiPropertyOptional({ description: 'With fees' })
//   @IsBoolean()
//   @IsOptional()
//   with_fees?: boolean;

//   @ApiPropertyOptional({ description: 'Buggage count' })
//   @IsNumber()
//   @IsOptional()
//   buggage_count?: number;
// }
