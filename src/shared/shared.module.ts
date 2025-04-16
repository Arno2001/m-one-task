import { HttpModule } from '@nestjs/axios';
import { forwardRef, Global, Module } from '@nestjs/common';

import { ApiConfigService } from './services/api-config.service';
import { JwtService } from './services/jwt.service';
import { UserModule } from '../modules/user/user.module';

const providers = [ApiConfigService, JwtService];

@Global()
@Module({
  providers,
  imports: [HttpModule, forwardRef(() => UserModule)],
  exports: [...providers, HttpModule],
})
export class SharedModule {}
