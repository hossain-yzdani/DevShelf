import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsEnum,
  IsInt,
  Min,
  MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { SettingType, SettingGroup } from '../entities/setting.entity';

export class CreateSettingDto {
  @ApiProperty({
    description: 'Unique setting key (used for lookup)',
    example: 'site_title',
    maxLength: 100,
  })
  @IsNotEmpty({ message: 'Key is required' })
  @IsString({ message: 'Key must be a string' })
  @MaxLength(100, { message: 'Key must not exceed 100 characters' })
  key!: string;

  @ApiProperty({
    description: 'Display name of the setting',
    example: 'Site Title',
  })
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  name!: string;

  @ApiProperty({
    description: 'Description of the setting',
    example: 'The main title shown in the browser tab',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  description?: string;

  @ApiProperty({
    description: 'Data type of the setting',
    enum: SettingType,
    example: SettingType.TEXT,
  })
  @IsNotEmpty({ message: 'Type is required' })
  @IsEnum(SettingType, { message: 'Invalid setting type' })
  type!: SettingType;

  @ApiProperty({
    description: 'Group of the setting',
    enum: SettingGroup,
    example: SettingGroup.GENERAL,
  })
  @IsNotEmpty({ message: 'Group is required' })
  @IsEnum(SettingGroup, { message: 'Invalid setting group' })
  group!: SettingGroup;

  @ApiProperty({
    description: 'Value of the setting',
    example: 'Qweb Agency',
  })
  @IsNotEmpty({ message: 'Value is required' })
  value!: any;

  @ApiProperty({
    description: 'Default value of the setting',
    example: 'Qweb Agency',
    required: false,
  })
  @IsOptional()
  defaultValue?: any;

  @ApiProperty({
    description: 'Whether the setting can be edited',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'isEditable must be a boolean' })
  isEditable?: boolean;

  @ApiProperty({
    description: 'Whether the setting is visible in admin panel',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'isVisible must be a boolean' })
  isVisible?: boolean;

  @ApiProperty({
    description: 'Sort order for display',
    example: 1,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'Sort order must be an integer' })
  @Min(0, { message: 'Sort order cannot be negative' })
  sortOrder?: number;
}
