import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { CategoryEnum } from 'src/helper/enums/Category.enums';
import { DeepPartial } from 'typeorm';

export class CreateCategoryDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  seater: DeepPartial<CategoryEnum>;
}
