import { Injectable } from '@nestjs/common';
import { SignOptions, sign } from 'jsonwebtoken';

import { TokenTypeEnum } from '../../constants/token-type.enum';
import type { IAccessTokenPayload } from '../../modules/auth/interfaces/IAccessTokenPayload';
import { ApiConfigService } from './api-config.service';
import { UserType } from 'src/modules/user/user.type';

// Service responsible for creating JWT access tokens
@Injectable()
export class JwtService {
  readonly jwtPrivateKey: string;

  readonly jwtPublicKey: string;

  readonly jwtExpirationTime: number;

  constructor(public apiConfigService: ApiConfigService) {
    // Give JWT config values from the ApiConfigService
    this.jwtPrivateKey = apiConfigService.authConfig.privateKey;
    this.jwtPublicKey = apiConfigService.authConfig.publicKey;
    this.jwtExpirationTime = apiConfigService.authConfig.expirationTime;
  }

  // Generates a signed JWT access token for the given user
  createAccessToken(user: UserType): string {
    const payload: IAccessTokenPayload = {
      userId: user.id,
      type: TokenTypeEnum.ACCESS_TOKEN,
    };
    const options: SignOptions = {
      algorithm: 'RS256',
      expiresIn: this.jwtExpirationTime,
    };

    return sign(payload, this.jwtPrivateKey, options);
  }
}
