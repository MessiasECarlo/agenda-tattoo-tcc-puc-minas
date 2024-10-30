import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('categories')
export default class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
}
