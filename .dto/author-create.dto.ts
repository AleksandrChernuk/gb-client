import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import {
  AuthorBioTranslationDto,
  AuthorCredentialsTranslationDto,
  AuthorNameTranslationDto,
  AuthorRoleTranslationDto,
  AuthorSocialLinkDto,
} from './author-fields.dto';

export class CreateAuthorDto {
  @ApiProperty({
    description: 'Unique slug for the author',
    example: 'olena-kovalchuk',
  })
  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsNotEmpty({ message: 'Slug is required' })
  slug: string;

  @ApiProperty({
    description: 'Author name translations',
    type: [AuthorNameTranslationDto],
  })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayUnique((item: AuthorNameTranslationDto) => item.language)
  @ValidateNested({ each: true })
  @Type(() => AuthorNameTranslationDto)
  name: AuthorNameTranslationDto[];

  @ApiProperty({
    description: 'Author role translations',
    type: [AuthorRoleTranslationDto],
  })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayUnique((item: AuthorRoleTranslationDto) => item.language)
  @ValidateNested({ each: true })
  @Type(() => AuthorRoleTranslationDto)
  role: AuthorRoleTranslationDto[];

  @ApiProperty({
    description: 'Author bio translations',
    type: [AuthorBioTranslationDto],
  })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayUnique((item: AuthorBioTranslationDto) => item.language)
  @ValidateNested({ each: true })
  @Type(() => AuthorBioTranslationDto)
  bio: AuthorBioTranslationDto[];

  @ApiProperty({
    description: 'Author credentials translations',
    type: [AuthorCredentialsTranslationDto],
  })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayUnique((item: AuthorCredentialsTranslationDto) => item.language)
  @ValidateNested({ each: true })
  @Type(() => AuthorCredentialsTranslationDto)
  credentials: AuthorCredentialsTranslationDto[];

  @ApiProperty({
    description: 'Author social network links',
    type: [AuthorSocialLinkDto],
  })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayUnique((item: AuthorSocialLinkDto) => item.socialName)
  @ValidateNested({ each: true })
  @Type(() => AuthorSocialLinkDto)
  socialLinks: AuthorSocialLinkDto[];

  @ApiPropertyOptional({
    description: 'Author photo URL',
    example: 'https://cloudinary.com/greenbus/authors/olena-kovalchuk.webp',
    required: false,
    nullable: true,
  })
  @Transform(({ value }) => {
    if (typeof value !== 'string') {
      return value;
    }

    const normalizedValue = value.trim();

    return normalizedValue === '' ? null : normalizedValue;
  })
  @IsOptional()
  @IsUrl()
  photo?: string | null;
}
