import { UserRole } from 'src/common/enums/usersRole.enum';
import { Download } from 'src/modules/downloads/entities/download.entity';
import { Favorite } from 'src/modules/favorites/entities/favorite.entity';
import { Search } from 'src/modules/searches/entities/search.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ nullable: true, type: 'bigint', unique: true })
  telegramId?: number;

  @Column({ nullable: true })
  username?: string;

  @Column({ nullable: true })
  password?: string;

  @Column({ nullable: true })
  firstName?: string;

  @Column({ nullable: true })
  lastName?: string;

  @Column({ default: 'fa' })
  languageCode?: string;

  @Column({ default: true })
  isActive!: boolean;

  @Column({ default: false })
  isAdmin!: boolean;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role!: string;

  @Column({ default: true })
  notifications!: boolean;

  @Column({ default: 'dark' })
  theme!: string;

  @OneToMany(() => Favorite, (favorite) => favorite.user)
  favorites!: Favorite[];

  @OneToMany(() => Download, (download) => download.user)
  downloads!: Download[];

  @OneToMany(() => Search, (search) => search.user)
  searches!: Search[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column({ nullable: true })
  lastActivity?: Date;
}
