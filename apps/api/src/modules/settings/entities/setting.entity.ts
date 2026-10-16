import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  Check,
} from "typeorm";

export enum SettingType {
  TEXT = "text",
  NUMBER = "number",
  BOOLEAN = "boolean",
  JSON = "json",
  IMAGE = "image",
  COLOR = "color",
}

export enum SettingGroup {
  GENERAL = "general",
  SEO = "seo",
  SOCIAL = "social",
  CONTACT = "contact",
  APPEARANCE = "appearance",
  NOTIFICATION = "notification",
}

@Entity()
@Index(["key"], { unique: true })
export class Setting {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  key!: string;

  @Column()
  name!: string;

  @Column("text", { nullable: true })
  description?: string;

  @Column({
    type: "enum",
    enum: SettingType,
    default: SettingType.TEXT,
  })
  type!: SettingType;

  @Column({
    type: "enum",
    enum: SettingGroup,
    default: SettingGroup.GENERAL,
  })
  group!: SettingGroup;

  @Column("jsonb")
  value!: any;

  @Column("jsonb", { nullable: true })
  defaultValue?: any;

  @Column({ default: true })
  isEditable!: boolean;

  @Column({ default: true })
  isVisible!: boolean;

  @Column({ type: "int", default: 0 })
  sortOrder!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}