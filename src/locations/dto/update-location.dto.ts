import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateLocationDto } from './create-location.dto';
import { DeepPartial } from 'typeorm';
import { LocationEnum } from 'src/helper/enums/Location.enums';

export class UpdateLocationDto extends PartialType(CreateLocationDto) {
  @ApiProperty()
  name: string;

  @ApiProperty()
  locationInfo: DeepPartial<LocationEnum>;
}
