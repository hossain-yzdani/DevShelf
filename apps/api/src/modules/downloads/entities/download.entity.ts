import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  Unique,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Resource } from '../../resources/entities/resource.entity';

@Entity('downloads')
@Unique(['user', 'resource'])
export class Download {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => User, (user) => user.downloads, { onDelete: 'CASCADE' })
  user!: User;

  @ManyToOne(() => Resource, (resource) => resource.downloads, {
    onDelete: 'CASCADE',
  })
  resource!: Resource;

  @CreateDateColumn()
  downloadedAt!: Date;
}
