import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'role' })
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'role_name',
  })
  roleName: string;
}
