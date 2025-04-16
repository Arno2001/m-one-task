import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { Auth, AuthUser } from '../../decorators';
import { UserDto } from './dto/user.dto';
import { UserType } from './user.type';
import { UserService } from './user.service';
import { UserNotFoundException } from './exceptions';
import { SearchUserDto } from './dto/search-user.dto';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  @HttpCode(HttpStatus.OK)
  @Auth()
  @ApiOkResponse({ type: UserDto, description: 'Current user info' })
  async getCurrentUser(@AuthUser() user: UserType) {
    if (!user) {
      throw new UserNotFoundException();
    }

    return this.userService.findById(user.id);
  }

  @Get('/search')
  @Auth()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Get users list',
    type: [UserDto],
  })
  async search(
    @AuthUser() user: UserType,
    @Query() searchUserDto: SearchUserDto,
  ): Promise<UserDto[]> {
    return this.userService.search(user.id, searchUserDto);
  }

  @Delete()
  @Auth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOkResponse({
    description: 'Delete user',
  })
  delete(@AuthUser() user: UserType): Promise<void> {
    return this.userService.delete(user.id);
  }
}
