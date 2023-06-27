import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { DeepPartial } from 'typeorm';
import { location } from '../entities/location.entity';
import { LocationEnum } from 'src/helper/enums/Location.enums';

export class CreateLocationDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  locationInfo: DeepPartial<LocationEnum>;
}
