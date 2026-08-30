import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('searches')
export class Search {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => User, (user) => user.searches, { onDelete: 'CASCADE' })
  user!: User;

  @Column({ type: 'text' })
  query!: string;

  @Column({ default: 0 })
  resultCount!: number;

  @CreateDateColumn()
  searchedAt!: Date;
}
