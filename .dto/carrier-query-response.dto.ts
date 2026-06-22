import { ApiProperty } from '@nestjs/swagger';

import { CarrierSimpleResponseDto } from './carrier-simple-response.dto';

export class CarriersQueryResponseDto {
  @ApiProperty({
    type: [CarrierSimpleResponseDto],
  })
  data: CarrierSimpleResponseDto[];

  @ApiProperty({
    example: 120,
  })
  totalCarriers: number;

  @ApiProperty({
    example: 1,
  })
  page: number;

  @ApiProperty({
    example: 50,
  })
  perPage: number;

  @ApiProperty({
    example: 3,
  })
  totalPages: number;
}
