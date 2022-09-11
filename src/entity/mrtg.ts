import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Mrtg_info {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  url: string;

  @Column()
  customer_id: number;
}
