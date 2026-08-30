import { Resource } from 'src/modules/resources/entities/resource.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true, type: 'text' })
  slug!: string;

  @Column({ unique: true, type: 'text' })
  name!: string;

  @Column({ unique: true, type: 'text' })
  description!: string;

  @OneToMany(() => Resource, (resource) => resource.category)
  resources!: Resource[];

  @UpdateDateColumn()
  updatedAt!: Date;

  @CreateDateColumn()
  createdAt!: Date;
}
