import { SoftDelete } from 'src/AllEntites/HelperEntites/SoftDelete.entites';
import { Bookings } from 'src/bookings/entities/booking.entity';
import { Category } from 'src/categories/entities/category.entity';
import { CategoryEnum } from 'src/helper/enums/Category.enums';
import { location } from 'src/locations/entities/location.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class Payment extends SoftDelete {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  id: number;

  @Column({ name: 'amount', nullable: true })
  amount: string;

  @OneToOne(() => Bookings, (b) => b.paymentId)
  @JoinColumn({ name: 'booking_id' })
  bookingId: Bookings;
}
