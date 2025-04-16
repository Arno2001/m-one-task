import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { FriendStatusTypeEnum } from 'src/constants/friend-status-type.enum';

export class UpdateStatusDto {
  @ApiProperty({
    required: true,
    enum: [FriendStatusTypeEnum.ACCEPT, FriendStatusTypeEnum.DECLINE],
  })
  @IsEnum(FriendStatusTypeEnum)
  @IsNotEmpty({ message: 'Status is required' })
  status: FriendStatusTypeEnum;
}
