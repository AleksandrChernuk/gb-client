import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

import { ArticleDescriptionDto, ArticlePhotoDto } from './article-fields.dto';

const transformOptionalNullableId = ({ value }: { value: unknown }) => {
  if (value === null) {
    return null;
  }

  if (value === undefined || value === '') {
    return undefined;
  }

  return Number(value);
};

export class CreateArticleDto {
  @ApiProperty({
    description: 'Unique slug for the article',
    example: 'travel-to-antalya-complete-guide',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsNotEmpty({ message: 'Slug is required' })
  slug: string;

  @ApiProperty({
    description: 'List of hashtags for filtering and search',
    example: ['turkey', 'antalya', 'sea', 'bus-tickets'],
    isArray: true,
    type: String,
  })
  @IsArray({ message: 'Hashtags must be an array' })
  @ArrayMinSize(1, { message: 'At least one hashtag is required' })
  @ArrayUnique({ message: 'Hashtags must be unique' })
  @IsString({ each: true, message: 'Each hashtag must be a string' })
  hashtags: string[];

  @ApiProperty({
    description: 'Localized descriptions and content of the article',
    type: () => ArticleDescriptionDto,
    isArray: true,
  })
  @IsArray({ message: 'Descriptions must be an array' })
  @ArrayMinSize(1, { message: 'At least one description is required' })
  @ArrayUnique((item: ArticleDescriptionDto) => item.language, {
    message: 'Article descriptions must contain unique languages',
  })
  @ValidateNested({ each: true })
  @Type(() => ArticleDescriptionDto)
  descriptions: ArticleDescriptionDto[];

  @ApiPropertyOptional({
    description: 'Photos related to the article',
    type: () => ArticlePhotoDto,
    isArray: true,
    nullable: true,
  })
  @IsOptional()
  @IsArray({ message: 'Photos must be an array' })
  @ValidateNested({ each: true })
  @Type(() => ArticlePhotoDto)
  photos?: ArticlePhotoDto[];

  @ApiPropertyOptional({
    description: 'Related country ID',
    example: 17,
    nullable: true,
  })
  @Transform(transformOptionalNullableId)
  @IsOptional()
  @IsInt({ message: 'countryId must be an integer' })
  @Min(1, { message: 'countryId must be at least 1' })
  countryId?: number | null;

  @ApiPropertyOptional({
    description: 'Related location ID',
    example: 125,
    nullable: true,
  })
  @Transform(transformOptionalNullableId)
  @IsOptional()
  @IsInt({ message: 'locationId must be an integer' })
  @Min(1, { message: 'locationId must be at least 1' })
  locationId?: number | null;

  @ApiPropertyOptional({
    description: 'Related author ID',
    example: 5,
    nullable: true,
  })
  @Transform(transformOptionalNullableId)
  @IsOptional()
  @IsInt({ message: 'authorId must be an integer' })
  @Min(1, { message: 'authorId must be at least 1' })
  authorId?: number | null;
}
