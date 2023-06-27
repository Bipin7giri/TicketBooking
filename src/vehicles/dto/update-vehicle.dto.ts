import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateVehicleDto } from './create-vehicle.dto';
import { Category } from 'src/categories/entities/category.entity';

export class UpdateVehicleDto extends PartialType(CreateVehicleDto) {
  @ApiProperty()
  name: string;

  @ApiProperty()
  make: string;

  @ApiProperty()
  year: Date;

  @ApiProperty()
  color: string;

  @ApiProperty()
  rentalRatePerDay: number;

  @ApiProperty()
  availabilityStatus: boolean;

  @ApiProperty()
  categoryId: Category;

  @ApiProperty()
  image: string;
}
