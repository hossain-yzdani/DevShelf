import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class LoginAuthDto {
  @ApiProperty({
    description: 'Username or email of the user',
    example: 'john_doe or john@example.com',
    required: true,
  })
  @IsNotEmpty({ message: 'Username or email is required' })
  @IsString({ message: 'Username must be a string' })
  @MinLength(3, { message: 'Username must be at least 3 characters long' })
  @MaxLength(50, { message: 'Username must not exceed 50 characters' })
  username!: string;

  @ApiProperty({
    description: 'User password',
    example: 'StrongP@ssw0rd123',
    required: true,
  })
  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password must be a string' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password!: string;
}
