import { SoftDelete } from 'src/AllEntites/HelperEntites/SoftDelete.entites';
import { CategoryEnum } from 'src/helper/enums/Category.enums';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Category extends SoftDelete {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  id: number;

  @Column({ name: 'name', nullable: true })
  name: string;

  @Column({
    type: 'enum',
    enum: CategoryEnum,
    default: CategoryEnum.FourSeater,
  })
  seater: CategoryEnum;

  @OneToMany(() => Vehicle, (v) => v.categoryId)
  vehicle: Vehicle[];
}
