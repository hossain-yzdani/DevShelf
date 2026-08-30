import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserResponseDto } from './dto/response-user.dto';
import { UserMapper } from './user.mapper';
import * as argon from 'argon2';
import { CreateTelegramUserDto } from './dto/create-user-from-telegram.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createAdmin(createUserDto: CreateUserDto): Promise<User> {
    try {
      const { password, ...userData } = createUserDto;
      let hashedPassword: string | undefined;
      if (password) {
        hashedPassword = await argon.hash(password);
      }
      const user = this.userRepository.create({
        ...userData,
        password: hashedPassword,
      });
      return await this.userRepository.save(user);
    } catch (error: any) {
      if (error.code === '23505') {
        throw new ConflictException('Username has used');
      }
      throw new InternalServerErrorException('Create user faild');
    }
  }

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.find({
      relations: {
        favorites: {
          resource: true,
        },
        downloads: {
          resource: true,
        },
        searches: true,
      },
    });
    return UserMapper.toResponseDtoArray(users);
  }

  async findOne(username: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findOne({
      where: { username },
      relations: {
        favorites: {
          resource: true,
        },
        downloads: {
          resource: true,
        },
        searches: true,
      },
    });
    if (!user) {
      throw new NotFoundException('User was not found');
    }
    return UserMapper.toResponseDto(user);
  }

  async findForAuth(username: string) {
    return this.userRepository.findOne({
      where: { username },
      select: {
        id: true,
        username: true,
        password: true,
        role: true,
        isActive: true,
      },
    });
  }

  async findOneByTelegramId(id: number) {
    const user = await this.userRepository.findOne({
      where: { telegramId: id },
      relations: {
        favorites: {
          resource: true,
        },
        downloads: {
          resource: true,
        },
        searches: true,
      },
    });
    if (!user) {
      throw new NotFoundException('User was not found');
    }
    return UserMapper.toResponseDto(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      let hashedPassword: string | undefined;
      if (updateUserDto.password) {
        hashedPassword = await argon.hash(updateUserDto.password);
      }
      if (!user) {
        throw new NotFoundException('User was not found');
      }
      // const newUser: UpdateUserDto = {
      //   ...user,
      //   password: hashedPassword,
      // };
      Object.assign(user, {...updateUserDto, password: hashedPassword});
      await this.userRepository.save(user);
      return await this.userRepository.findOne({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException('Update user faild');
    }
  }

  async remove(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User was not found');
    }
    await this.userRepository.remove(user);
  }
}
