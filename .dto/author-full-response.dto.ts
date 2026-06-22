import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

import {
  AuthorArticleResponseDto,
  AuthorBioTranslationDto,
  AuthorCredentialsTranslationDto,
  AuthorNameTranslationDto,
  AuthorRoleTranslationDto,
  AuthorSocialLinkDto,
} from './author-fields.dto';

export class AuthorFullResponseDto {
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
    description: 'Author name in selected language',
    type: AuthorNameTranslationDto,
    nullable: true,
  })
  @IsOptional()
  name: AuthorNameTranslationDto | null;

  @ApiPropertyOptional({
    description: 'Author role in selected language',
    type: AuthorRoleTranslationDto,
    nullable: true,
  })
  @IsOptional()
  role: AuthorRoleTranslationDto | null;

  @ApiPropertyOptional({
    description: 'Author bio in selected language',
    type: AuthorBioTranslationDto,
    nullable: true,
  })
  @IsOptional()
  bio: AuthorBioTranslationDto | null;

  @ApiPropertyOptional({
    description: 'Author credentials in selected language',
    type: AuthorCredentialsTranslationDto,
    nullable: true,
  })
  @IsOptional()
  credentials: AuthorCredentialsTranslationDto | null;

  @ApiProperty({
    description: 'Author social network links',
    type: [AuthorSocialLinkDto],
  })
  socialLinks: AuthorSocialLinkDto[] | [];

  @ApiPropertyOptional({
    description: 'Author photo URL',
    example: 'https://cloudinary.com/greenbus/authors/olena-kovalchuk.webp',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  photo: string | null;

  @ApiProperty({
    description: 'Author articles list',
    type: [AuthorArticleResponseDto],
  })
  articles: AuthorArticleResponseDto[] | [];

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  createdAt: Date;
}
