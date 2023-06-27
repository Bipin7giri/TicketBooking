import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
} from 'typeorm';
import { TimeStamp } from './TimeStamp.entities';

@Entity()
export class SoftDelete extends TimeStamp {
  @Column({ nullable: true })
  deletedBy?: string;

  @Column({ nullable: true, default: false })
  deleted?: boolean;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt?: Date;
}
