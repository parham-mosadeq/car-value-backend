import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  make: string;

  @Column()
  year: number;

  @Column()
  model: string;

  @Column()
  price: number;
}
