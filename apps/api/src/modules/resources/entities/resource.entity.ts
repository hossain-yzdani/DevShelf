import { ResourceType } from 'src/common/enums/resourcesType.enum';
import { Category } from 'src/modules/categories/entities/category.entity';
import { Download } from 'src/modules/downloads/entities/download.entity';
import { Favorite } from 'src/modules/favorites/entities/favorite.entity';
import { Tag } from 'src/modules/tags/entities/tag.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Resource {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true, type: 'text' })
  name!: string;

  @Column({ unique: true, type: 'text' })
  slug!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column({
    type: 'enum',
    enum: ResourceType,
    default: ResourceType.BOOK,
  })
  type!: ResourceType;

  @Column()
  fileUrl!: string;

  @Column()
  posterUrl!: string;

  @Column()
  author!: string;

  @OneToMany(() => Favorite, (favorite) => favorite.resource)
  favorites!: Favorite[];

  @OneToMany(() => Download, (download) => download.resource)
  downloads!: Download[];

  @ManyToMany(() => Tag, (tag) => tag.resources)
  @JoinTable({
    name: 'resource_tags',
  })
  tags!: Tag[];

  @ManyToOne(() => Category, (category) => category.resources)
  category!: Category;

  @UpdateDateColumn()
  updatedAt!: Date;

  @CreateDateColumn()
  createdAt!: Date;
}
