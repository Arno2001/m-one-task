import { ApiProperty } from '@nestjs/swagger';
import type { UserType } from '../user.type';

export class UserDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  first_name: string;

  @ApiProperty()
  last_name: string;

  @ApiProperty()
  age: number;

  @ApiProperty()
  email: string;

  constructor(user: UserType) {
    this.id = user.id;
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.age = user.age;
    this.email = user.email;
  }
}
