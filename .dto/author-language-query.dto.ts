import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class AuthorLanguageQueryDto {
  @ApiProperty({
    description: 'Response language',
    example: 'uk',
    minLength: 2,
    maxLength: 2,
  })
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim().toLowerCase() : value,
  )
  @IsNotEmpty()
  @IsString()
  @Length(2, 2)
  @Matches(/^[a-z]{2}$/, {
    message: 'language must be a two-letter lowercase language code',
  })
  language: string;
}
