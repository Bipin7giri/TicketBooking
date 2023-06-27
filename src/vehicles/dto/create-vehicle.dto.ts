import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Category } from 'src/categories/entities/category.entity';

export class CreateVehicleDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  make: string;

  @ApiProperty()
  @IsNotEmpty()
  year: Date;

  @ApiProperty()
  @IsNotEmpty()
  color: string;

  @ApiProperty()
  @IsNotEmpty()
  rentalRatePerDay: number;

  @ApiProperty()
  @IsNotEmpty()
  availabilityStatus: boolean;

  @ApiProperty()
  @IsNotEmpty()
  categoryId: Category;

  @ApiProperty()
  image: string;
}
