import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsUrl,
  Length,
  Matches,
} from 'class-validator';

export class AuthorNameTranslationDto {
  @ApiProperty({
    description: 'Language of the translation',
    example: 'en',
    minLength: 2,
    maxLength: 2,
  })
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim().toLowerCase() : value,
  )
  @IsString()
  @Length(2, 2)
  @Matches(/^[a-z]{2}$/, {
    message: 'language must be a two-letter lowercase language code',
  })
  language: string;

  @ApiProperty({
    description: 'Author name in the specified language',
    example: 'Olena Kovalchuk',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsNotEmpty()
  authorName: string;
}

export class AuthorRoleTranslationDto {
  @ApiProperty({
    description: 'Language of the translation',
    example: 'en',
    minLength: 2,
    maxLength: 2,
  })
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim().toLowerCase() : value,
  )
  @IsString()
  @Length(2, 2)
  @Matches(/^[a-z]{2}$/, {
    message: 'language must be a two-letter lowercase language code',
  })
  language: string;

  @ApiProperty({
    description: 'Author role in the specified language',
    example: 'Travel editor',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsNotEmpty()
  authorRole: string;
}

export class AuthorBioTranslationDto {
  @ApiProperty({
    description: 'Language of the translation',
    example: 'en',
    minLength: 2,
    maxLength: 2,
  })
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim().toLowerCase() : value,
  )
  @IsString()
  @Length(2, 2)
  @Matches(/^[a-z]{2}$/, {
    message: 'language must be a two-letter lowercase language code',
  })
  language: string;

  @ApiProperty({
    description: 'Author bio in the specified language',
    example:
      'Master of Tourism Business. 8 years of experience in passenger transportation.',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsNotEmpty()
  authorBio: string;
}

export class AuthorCredentialsTranslationDto {
  @ApiProperty({
    description: 'Language of the translation',
    example: 'en',
    minLength: 2,
    maxLength: 2,
  })
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim().toLowerCase() : value,
  )
  @IsString()
  @Length(2, 2)
  @Matches(/^[a-z]{2}$/, {
    message: 'language must be a two-letter lowercase language code',
  })
  language: string;

  @ApiProperty({
    description: 'Author credentials in the specified language',
    example: '8 years in the field of passenger transportation.',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsNotEmpty()
  authorCredentials: string;
}

export class AuthorSocialLinkDto {
  @ApiProperty({
    description: 'Name of social network',
    example: 'instagram',
    minLength: 1,
  })
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim().toLowerCase() : value,
  )
  @IsString()
  @IsNotEmpty()
  socialName: string;

  @ApiProperty({
    description: 'Link of author social network account',
    example: 'https://instagram/olena-kovalchuk',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsUrl()
  @IsNotEmpty()
  socialLink: string;
}

class AuthorArticleDescriptionResponseDto {
  @ApiProperty()
  language: string;

  @ApiProperty()
  title: string;
}

export class AuthorArticleResponseDto {
  @ApiProperty({
    description: 'Article ID',
    example: 5,
  })
  @IsInt()
  id: number;

  @ApiProperty({
    description: 'Article slug',
    example: 'Travel from Kyiv to Warsaw',
  })
  @IsString()
  slug: string;

  @ApiPropertyOptional({
    description: 'Localized descriptions and content of the article',
    type: () => AuthorArticleDescriptionResponseDto,
    nullable: true,
  })
  descriptions: AuthorArticleDescriptionResponseDto | null;
}
