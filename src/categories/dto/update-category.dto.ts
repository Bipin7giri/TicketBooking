import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCategoryDto } from './create-category.dto';
import { DeepPartial } from 'typeorm';
import { CategoryEnum } from 'src/helper/enums/Category.enums';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @ApiProperty()
  name: string;

  @ApiProperty()
  seater: DeepPartial<CategoryEnum>;
}
