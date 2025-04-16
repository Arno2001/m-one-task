import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class UserRegisterDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty({ message: 'First name is required' })
  first_name: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty({ message: 'Last name is required' })
  last_name: string;

  @ApiProperty({ required: true })
  @IsNumber()
  @IsNotEmpty({ message: 'Age is required' })
  age: number;

  @ApiProperty({ required: true })
  @IsEmail({}, { message: 'Email is not valid' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @ApiProperty({ required: true })
  @IsString()
  @Length(8, 16, { message: 'Password must be between 8 and 16 characters' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d\s])[^\s]+$/, {
    message:
      'Password must include uppercase, lowercase, number, symbol, and no spaces.',
  })
  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}
