import { SoftDelete } from 'src/AllEntites/HelperEntites/SoftDelete.entites';
import { CategoryEnum } from 'src/helper/enums/Category.enums';
import { LocationEnum } from 'src/helper/enums/Location.enums';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class location extends SoftDelete {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  id: number;

  @Column({ name: 'name', nullable: true })
  name: string;

  @Column({
    type: 'enum',
    enum: LocationEnum,
    default: LocationEnum.InsideValley,
    name: 'location_info',
  })
  locationInfo: LocationEnum;

  @OneToMany(() => Vehicle, (v) => v.locationId)
  vehicleId: Vehicle[];
}
