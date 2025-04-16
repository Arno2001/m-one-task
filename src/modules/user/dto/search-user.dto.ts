import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SearchUserDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty({ message: 'First name is required' })
  first_name: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty({ message: 'Last name is required' })
  last_name: string;

  @ApiProperty({ required: true })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty({ message: 'Age is required' })
  age: number;
}
