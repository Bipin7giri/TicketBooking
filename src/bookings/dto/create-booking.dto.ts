import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';

export class CreateBookingDto {
  @ApiProperty()
  @IsNotEmpty()
  rentalStartDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  rentalEndDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  vehicleId: Vehicle;
}
