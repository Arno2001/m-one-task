import { ApiProperty } from '@nestjs/swagger';
import { FriendStatusTypeEnum } from 'src/constants/friend-status-type.enum';
import { UserDto } from 'src/modules/user/dto/user.dto';
import { FriendRequestType } from '../friend-request.type';

export class FriendRequestDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  receiver_id: string;

  @ApiProperty({
    enum: FriendStatusTypeEnum,
  })
  status: FriendStatusTypeEnum;

  @ApiProperty()
  sent_at: string;

  @ApiProperty()
  sender: UserDto;

  constructor(user: FriendRequestType) {
    this.id = user.id;
    this.receiver_id = user.receiver_id;
    this.status = user.status;
    this.sent_at = user.sent_at;
    this.sender = user.sender;
  }
}
