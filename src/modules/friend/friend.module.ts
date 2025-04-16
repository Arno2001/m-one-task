import { Module } from '@nestjs/common';

import { FriendController } from './friend.controller';
import { FriendService } from './friend.service';

@Module({
  controllers: [FriendController],
  exports: [FriendService],
  providers: [FriendService],
})
export class FriendModule {}
