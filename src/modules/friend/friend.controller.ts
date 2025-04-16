import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { Auth, AuthUser } from '../../decorators';
import { FriendService } from './friend.service';
import { UpdateStatusDto } from './dto/friend-status.dto';
import { UserType } from '../user/user.type';
import { FriendRequestDto } from './dto/friend-request.dto';
import { UserDto } from '../user/dto/user.dto';

@Controller('friends')
@ApiTags('friends')
export class FriendController {
  constructor(private friendService: FriendService) {}
  @Post('/:receiver_id')
  @Auth()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Send friend request',
    type: FriendRequestDto,
  })
  async sendRequest(
    @AuthUser() user: UserType,
    @Param('receiver_id') receiver_id: string,
  ): Promise<FriendRequestDto> {
    return this.friendService.sendRequest(receiver_id, user.id);
  }

  @Get()
  @Auth()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Get friends list',
    type: [UserDto],
  })
  async getAll(@AuthUser() user: UserType): Promise<UserDto[]> {
    return this.friendService.getAll(user.id);
  }

  @Get('/requests')
  @Auth()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Get friend requests list',
    type: [FriendRequestDto],
  })
  async getAllRequests(
    @AuthUser() user: UserType,
  ): Promise<FriendRequestDto[]> {
    return this.friendService.getAllRequests(user.id);
  }

  @Put('/:id')
  @Auth()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Update friend request status',
    type: FriendRequestDto,
  })
  async updateStatus(
    @Param('id') id: string,
    @Query()
    updateDto: UpdateStatusDto,
  ): Promise<FriendRequestDto> {
    return this.friendService.updateStatus(id, updateDto.status);
  }
}
