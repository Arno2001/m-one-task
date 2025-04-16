import { ConflictException } from '@nestjs/common';

export class FriendRequestExistsException extends ConflictException {
  constructor() {
    super('Friend Request Is Already Exists');
  }
}
