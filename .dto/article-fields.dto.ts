import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  Matches,
} from 'class-validator';

export class ArticleDescriptionDto {
  @ApiProperty({
    description: 'Language code',
    example: 'uk',
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
    description: 'Title of the article in this language',
    example: 'Подорож до Анталії: повний гайд',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @ApiProperty({
    description: 'Short rich-text description as HTML string',
    example: '<p class="text-node">Short teaser text...</p>',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString({ message: 'Description must be a string' })
  @IsNotEmpty({ message: 'Description is required' })
  description: string;

  @ApiProperty({
    description: 'Full article content as HTML string',
    example:
      '<p class="text-node">Full article body...</p><p class="text-node">Second paragraph...</p>',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString({ message: 'Content must be a string' })
  @IsNotEmpty({ message: 'Content is required' })
  content: string;

  @ApiPropertyOptional({
    description: 'SEO meta title per language',
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
  @IsString()
  metaTitle?: string | null;

  @ApiPropertyOptional({
    description: 'SEO meta description per language',
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
  @IsString()
  metaDescription?: string | null;
}

export class ArticlePhotoDto {
  @ApiProperty({
    description: 'Photo URL',
    example: 'https://example.com/images/antalya-beach.jpg',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsUrl({}, { message: 'Photo URL must be a valid URL' })
  @IsNotEmpty({ message: 'Photo URL is required' })
  url: string;

  @ApiProperty({
    description: 'Alt text',
    example: 'Beach in Antalya at sunset',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsNotEmpty({ message: 'Alt text is required' })
  alt: string;

  @ApiPropertyOptional({
    description: 'Display order for the photo in gallery',
    example: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'Order must be an integer' })
  order?: number;

  @ApiPropertyOptional({
    description: 'Marks this photo as cover image for the article',
    example: true,
    default: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'isCover must be a boolean' })
  isCover?: boolean;
}

export class ArticlePhotoResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty({
    description: 'Photo URL',
    example: 'https://cdn.example.com/images/antalya-beach.jpg',
  })
  url: string;

  @ApiProperty({
    description: 'Alt text',
    example: 'Beach in Antalya at sunset',
  })
  alt: string;

  @ApiProperty({
    description: 'Display order in the gallery',
    example: 1,
  })
  order: number;

  @ApiProperty({
    description: 'Marks this photo as a cover image',
    example: true,
  })
  isCover: boolean;

  @ApiProperty({
    description: 'ID of the related article',
    example: 42,
  })
  articleId: number;

  @ApiProperty({
    type: String,
    format: 'date-time',
    description: 'Creation timestamp',
  })
  @Type(() => Date)
  createdAt: Date;

  @ApiProperty({
    type: String,
    format: 'date-time',
    description: 'Last update timestamp',
  })
  @Type(() => Date)
  updatedAt: Date;
}

export class ArticleTextsResponseDto {
  @ApiProperty({
    description: 'Title of the article in this language',
    example: 'Подорож до Анталії: повний гайд',
  })
  title: string;

  @ApiProperty({
    description: 'Short rich-text description as HTML string',
    example: '<p class="text-node">Short teaser text...</p>',
  })
  description: string;

  @ApiPropertyOptional({
    description: 'SEO meta title per language',
    nullable: true,
  })
  metaTitle?: string | null;

  @ApiPropertyOptional({
    description: 'SEO meta description per language',
    nullable: true,
  })
  metaDescription?: string | null;
}

export class ArticleOnePhotoResponseDto {
  @ApiProperty({
    description: 'Photo URL',
    example: 'https://example.com/images/antalya-beach.jpg',
  })
  url: string;

  @ApiProperty({
    description: 'Alt text',
    example: 'Beach in Antalya at sunset',
  })
  alt: string;
}

export class ArticleAuthorNameResponseDto {
  @ApiProperty({
    description: 'Language of the author name translation',
    example: 'uk',
  })
  language: string;

  @ApiProperty({
    description: 'Author name in selected language',
    example: 'Олена Ковальчук',
  })
  authorName: string;
}

export class ArticleAuthorRoleResponseDto {
  @ApiProperty({
    description: 'Language of the author role translation',
    example: 'uk',
  })
  language: string;

  @ApiProperty({
    description: 'Author role in selected language',
    example: 'Travel editor',
  })
  authorRole: string;
}

export class ArticleAuthorResponseDto {
  @ApiProperty({
    description: 'Author ID',
    example: 5,
  })
  id: number;

  @ApiProperty({
    description: 'Author slug',
    example: 'olena-kovalchuk-5',
  })
  slug: string;

  @ApiPropertyOptional({
    description: 'Author name in selected language',
    type: () => ArticleAuthorNameResponseDto,
    nullable: true,
  })
  name: ArticleAuthorNameResponseDto | null;

  @ApiPropertyOptional({
    description: 'Author role in selected language',
    type: () => ArticleAuthorRoleResponseDto,
    nullable: true,
  })
  role: ArticleAuthorRoleResponseDto | null;

  @ApiPropertyOptional({
    description: 'Author photo URL',
    example: 'https://cloudinary.com/greenbus/authors/olena-kovalchuk.webp',
    nullable: true,
  })
  photo: string | null;
}
