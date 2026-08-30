import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  Unique,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Resource } from '../../resources/entities/resource.entity';

@Entity()
@Unique(['user', 'resource'])
export class Favorite {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => User, (user) => user.favorites, { onDelete: 'CASCADE' })
  user!: User;

  @ManyToOne(() => Resource, (resource) => resource.favorites, {
    onDelete: 'CASCADE',
  })
  resource!: Resource;

  @CreateDateColumn()
  createdAt!: Date;
}
