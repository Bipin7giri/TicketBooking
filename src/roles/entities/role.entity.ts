import { User } from 'src/AllEntites';
import { SoftDelete } from 'src/AllEntites/HelperEntites/SoftDelete.entites';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Role extends SoftDelete {
  static Admin(Admin: any) {
    throw new Error('Method not implemented.');
  }
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  id: number;

  @Column()
  name: string;

  @Column('text', { array: true })
  roles: string[];

  @OneToMany(() => User, (user) => user.roleId)
  userId: User[];
}
