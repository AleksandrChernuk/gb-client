import { ApiProperty } from '@nestjs/swagger';

import { AuthorSimpleResponseDto } from './author-simple-response.dto';

export class AuthorsQueryResponseDto {
  @ApiProperty({
    type: [AuthorSimpleResponseDto],
  })
  data: AuthorSimpleResponseDto[];

  @ApiProperty({
    example: 120,
  })
  totalAuthors: number;

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
