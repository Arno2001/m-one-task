import { Injectable } from '@nestjs/common';

import { GeneratorProvider } from '../../providers';
import { JwtService } from '../../shared/services/jwt.service';
import { UserService } from '../user/user.service';
import { LoginPayloadDto } from './dto/login-payload.dto';
import type { UserLoginDto } from './dto/user-login.dto';
import type { UserRegisterDto } from './dto/user-register.dto';
import { InvalidPasswordException } from './exceptions';
import { UserNotFoundException } from '../user/exceptions';
import { UserDto } from '../user/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async register(userRegisterDto: UserRegisterDto): Promise<LoginPayloadDto> {
    const user = await this.userService.createUser(userRegisterDto);
    const accessToken = this.jwtService.createAccessToken(user);

    return new LoginPayloadDto({ accessToken, user });
  }

  async login(userLoginDto: UserLoginDto): Promise<LoginPayloadDto> {
    const user = await this.userService.findByEmail(userLoginDto.email);

    if (!user) {
      throw new UserNotFoundException();
    }

    const isPasswordValid = await GeneratorProvider.validateHash(
      userLoginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new InvalidPasswordException();
    }

    const accessToken = this.jwtService.createAccessToken(user);

    return new LoginPayloadDto({ accessToken, user: new UserDto(user) });
  }
}
