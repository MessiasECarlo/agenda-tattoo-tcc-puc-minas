import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('posts')
export default class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  category_id: string;

  @Column()
  user_id: string;
}
