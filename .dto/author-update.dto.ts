import { PartialType } from '@nestjs/swagger';

import { CreateAuthorDto } from './author-create.dto';

export class UpdateAuthorDto extends PartialType(CreateAuthorDto) {}
