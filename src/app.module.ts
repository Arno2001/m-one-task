import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { FriendModule } from './modules/friend/friend.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    FriendModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
})
export class AppModule {}
