import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/AllEntites';
import { SoftDelete } from 'src/AllEntites/HelperEntites/SoftDelete.entites';
import { UserCredential } from 'src/users/entities/UserCredential.entities';
import { Gender } from 'src/helper/enums/Users.enum';
import { Bookings } from 'src/bookings/entities/booking.entity';
@Entity()
export class User extends SoftDelete {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'full_name', nullable: true })
  fullName: string;

  @ApiProperty()
  @Column({
    nullable: false,
    default: '',
  })
  username: string;

  @Column({
    name: 'email_address',
    nullable: false,
    default: '',
    unique: true,
  })
  email: string;

  @Column({ nullable: true })
  address: string;

  @Column({ name: 'phone_number', nullable: true })
  phoneNumber: string;

  @Column({ type: 'enum', enum: Gender, default: Gender.Other })
  gender: Gender;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ name: 'is_blocked', default: false })
  isBlocked: boolean;

  @ManyToOne(() => Role, (role) => role.userId)
  @JoinColumn({ name: 'role_id' })
  roleId: Role;

  @OneToMany(() => Bookings, (booking) => booking.customerId)
  bookingId: Bookings;

  @OneToOne(() => UserCredential, (uc) => uc.userId)
  @JoinColumn({ name: 'user_credential_id' })
  userCredentialId: UserCredential;
}
