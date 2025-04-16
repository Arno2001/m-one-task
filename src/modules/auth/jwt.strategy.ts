import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { TokenTypeEnum } from '../../constants/token-type.enum';
import type { UserType } from '../user/user.type';
import { UserService } from '../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: String(process.env.JWT_PUBLIC_KEY),
    });
  }

  async validate(args: {
    userId: string;
    type: TokenTypeEnum;
  }): Promise<UserType> {
    if (args.type !== TokenTypeEnum.ACCESS_TOKEN) {
      throw new UnauthorizedException();
    }

    const user = await this.userService.findById(args.userId);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
