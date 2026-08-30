import { Resource } from 'src/modules/resources/entities/resource.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true, type: 'text' })
  slug!: string;

  @Column({ unique: true, type: 'text' })
  name!: string;

  @Column({ type: 'text' })
  description!: string;

  @ManyToMany(() => Resource, (resouce) => resouce.tags)
  resources!: Resource[];

  @UpdateDateColumn()
  updatedAt!: Date;

  @CreateDateColumn()
  createdAt!: Date;
}
