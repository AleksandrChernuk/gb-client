import { PartialType } from '@nestjs/swagger';

import { CreateArticleDto } from './article-create.dto';

export class UpdateArticleDto extends PartialType(CreateArticleDto) {}
