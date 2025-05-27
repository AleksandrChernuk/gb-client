// import {
//   IsDateString,
//   IsEmail,
//   IsEnum,
//   IsNotEmpty,
//   IsNumber,
//   IsOptional,
//   IsString,
//   ValidateNested,
// } from 'class-validator';
// import { Type } from 'class-transformer';
// import { ApiProperty } from '@nestjs/swagger';
// import { PaymentType } from '../types/payment.type';
// import { CreateTicketDto } from '../../tickets/dto/createTicketDto';

// export class CreateOrderDto {
//   @ApiProperty({ description: 'Provider ID', example: 'ch28HB85svs8' })
//   @IsString()
//   @IsNotEmpty({ message: 'Provider ID is required' })
//   provider_id: string;

//   @ApiProperty({ description: 'Route ID' })
//   @IsString()
//   @IsOptional()
//   route_id?: string;

//   @ApiProperty({ description: 'Trip ID' })
//   @IsString()
//   @IsOptional()
//   tripId?: string;

//   @ApiProperty({ description: 'Interval ID' })
//   @IsString()
//   @IsOptional()
//   intervalId?: string;

//   @ApiProperty({ description: 'Bus ID' })
//   @IsString()
//   @IsOptional()
//   bus_id?: string;

//   @ApiProperty({ description: 'Ticket Type ID' })
//   @IsNumber()
//   @IsOptional()
//   ticket_type_id?: number;

//   @ApiProperty({ description: 'Route Name' })
//   @IsString()
//   @IsOptional()
//   route_name?: string;

//   @ApiProperty({ description: 'Departure city ID' })
//   @IsNumber()
//   @IsNotEmpty({ message: 'Departure city ID is required' })
//   from_city_id: number;

//   @ApiProperty({ description: 'Departure city name' })
//   @IsString()
//   @IsNotEmpty({ message: 'Departure city name is required' })
//   from_city_name: string;

//   @ApiProperty({ description: 'Arrival city ID' })
//   @IsNumber()
//   @IsNotEmpty({ message: 'Arrival city ID is required' })
//   to_city_id: number;

//   @ApiProperty({ description: 'Arrival city name' })
//   @IsString()
//   @IsNotEmpty({ message: 'Arrival city name is required' })
//   to_city_name: string;

//   @ApiProperty({ description: 'Departure station ID' })
//   @IsNumber()
//   @IsNotEmpty({ message: 'Departure station ID is required' })
//   from_station_id: number;

//   @ApiProperty({ description: 'Departure station name' })
//   @IsString()
//   @IsNotEmpty({ message: 'Departure station name is required' })
//   from_station_name: string;

//   @ApiProperty({ description: 'Departure station latitude' })
//   @IsNumber()
//   @IsOptional()
//   from_station_lat?: number;

//   @ApiProperty({ description: 'Departure station longitude' })
//   @IsNumber()
//   @IsOptional()
//   from_station_lon?: number;

//   @ApiProperty({ description: 'Arrival station ID' })
//   @IsNumber()
//   @IsNotEmpty({ message: 'Arrival station ID is required' })
//   to_station_id: number;

//   @ApiProperty({ description: 'Arrival station name' })
//   @IsString()
//   @IsNotEmpty({ message: 'Arrival station name is required' })
//   to_station_name: string;

//   @ApiProperty({ description: 'Arrival station latitude' })
//   @IsNumber()
//   @IsOptional()
//   to_station_lat?: number;

//   @ApiProperty({ description: 'Arrival station longitude' })
//   @IsNumber()
//   @IsOptional()
//   to_station_lon?: number;

//   @ApiProperty({ description: 'Derture date', example: '2025-06-14' })
//   @IsDateString()
//   @IsNotEmpty({ message: 'Derture date is required' })
//   departure_date: string;

//   @ApiProperty({ description: 'Arrival date', example: '2025-06-15' })
//   @IsDateString()
//   @IsNotEmpty({ message: 'Arrival date is required' })
//   arrival_date: string;

//   @ApiProperty({ description: 'Derture time', example: '09:10:00' })
//   @IsString()
//   @IsNotEmpty({ message: 'Derture time is required' })
//   departure_time: string;

//   @ApiProperty({ description: 'Arrival time', example: '15:00:00' })
//   @IsString()
//   @IsNotEmpty({ message: 'Arrival time is required' })
//   arrival_time: string;

//   @ApiProperty({ description: 'Carrier ID' })
//   @IsString()
//   @IsOptional()
//   carrier_id?: string;

//   @ApiProperty({ description: 'Carrier name' })
//   @IsString()
//   @IsOptional()
//   carrier_name?: string;

//   @ApiProperty({ description: 'Trip type', example: 'oneway' })
//   @IsString()
//   @IsOptional()
//   trip_type?: string;

//   @ApiProperty({
//     description: 'Payment type',
//     enum: PaymentType,
//     example: PaymentType.PURCHASE,
//   })
//   @IsEnum(PaymentType, {
//     message: 'payment_type must be one of: PURCHASE, BOOK, PAYMENT_AT_BOARDING',
//   })
//   @IsNotEmpty({ message: 'Payment type is required' })
//   payment_type: PaymentType;

//   @ApiProperty({ description: 'Currency', example: 'UAH' })
//   @IsString()
//   @IsNotEmpty({ message: 'Currency is required' })
//   currency: string;

//   @ApiProperty({ description: 'Locale', example: 'EN' })
//   @IsString()
//   @IsNotEmpty({ message: 'Locale is required' })
//   locale: string;

//   @ApiProperty({ description: 'User ID' })
//   @IsString()
//   @IsOptional()
//   userId?: string;

//   @ApiProperty({ description: 'Customer email' })
//   @IsEmail()
//   @IsNotEmpty({ message: 'Customer email is required' })
//   customer_email: string;

//   @ApiProperty({ description: 'Customer phone' })
//   @IsString()
//   @IsNotEmpty({ message: 'Customer phone is required' })
//   customer_phone: string;

//   @ApiProperty({
//     description: 'List of tickets',
//     type: [CreateTicketDto],
//   })
//   @ValidateNested({ each: true })
//   @Type(() => CreateTicketDto)
//   tickets: CreateTicketDto[];
// }
