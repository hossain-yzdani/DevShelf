import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsDateString } from 'class-validator';

export class UserActivityDto {
  @ApiProperty({
    description: 'Last activity timestamp',
    example: '2026-08-25T14:30:00Z',
    required: false,
  })
  @IsOptional()
  @IsDateString({}, { message: 'Invalid date format' })
  lastActivity?: Date;
}
