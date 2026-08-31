import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { LoginAuthDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async registerBot(createAuthDto) {
    try {
      const user = await this.usersService.findForAuth(createAuthDto.username);
      if (user) {
        const updatedUser = await this.usersService.update(user.id, createAuthDto);
        return {
          user: {
            id: updatedUser?.id,
            telegramId: updatedUser?.telegramId
          },
          isExisting: true,
          status: "success"
        };
      } else {
        const newUser = await this.usersService.createAdmin(createAuthDto);
        if (!newUser) {
          throw new BadRequestException('Registration Failed');
        }
        return {
          user: {
            id: newUser.id,
            username: newUser.username,
          },
          isExisting: false,
          status: 'success',
        };
      }
    } catch (error) {
      throw new InternalServerErrorException('Registeration faild');
    }
  }

  async login(loginAuthDto: LoginAuthDto) {
    try {
      const user = await this.usersService.findForAuth(loginAuthDto.username);
      if (!user) {
        throw new UnauthorizedException('Username not found');
      }
      const result = await argon.verify(user.password!, loginAuthDto.password);
      if (!result) {
        throw new UnauthorizedException('Password is wrong');
      }
      const payload = { sub: user.id, username: user.username };
      const accessToken = await this.jwtService.signAsync(payload);
      // res.cookie('access_token', token, {
      //   httpOnly: true,
      //   secure: process.env.NODE_ENV === 'production',
      //   sameSite: 'lax',
      // });
      return {
        accessToken,
        user: {
          id: user.id,
          username: user.username,
          role: user.role,
        },
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Login faild');
    }
  }
}
