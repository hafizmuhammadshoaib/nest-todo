import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Role } from './role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Column({
    name: 'role_id',
    default: null,
  })
  roleId: number;

  @ManyToOne(() => Role, (role) => role.id)
  @JoinColumn({
    name: 'role_id',
  })
  role: Role;
}
