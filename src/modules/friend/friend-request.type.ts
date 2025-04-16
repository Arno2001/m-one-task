import { FriendStatusTypeEnum } from 'src/constants/friend-status-type.enum';
import { UserType } from '../user/user.type';

export type FriendRequestType = {
  id: string;
  receiver_id: string;
  status: FriendStatusTypeEnum;
  sent_at: string;
  sender: UserType;
};
