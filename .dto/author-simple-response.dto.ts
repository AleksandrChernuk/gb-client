import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';
import {
  AuthorNameTranslationDto,
  AuthorRoleTranslationDto,
} from './author-fields.dto';

export class AuthorSimpleResponseDto {
  @ApiProperty({
    description: 'Author ID',
    example: 5,
  })
  @IsInt()
  id: number;

  @ApiProperty({
    description: 'Author slug',
    example: 'olena-kovalchuk',
  })
  @IsString()
  slug: string;

  @ApiPropertyOptional({
    description: 'Author name',
    type: AuthorNameTranslationDto,
    nullable: true,
  })
  @IsOptional()
  name: AuthorNameTranslationDto | null;

  @ApiPropertyOptional({
    description: 'Author role translations',
    type: AuthorRoleTranslationDto,
    nullable: true,
  })
  @IsOptional()
  role: AuthorRoleTranslationDto | null;

  @ApiPropertyOptional({
    description: 'Author photo URL',
    example: 'https://cloudinary.com/greenbus/authors/olena-kovalchuk.webp',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  photo: string | null;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  createdAt: Date;
}
