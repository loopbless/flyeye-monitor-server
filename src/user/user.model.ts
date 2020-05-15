import { IsNotEmpty } from 'class-validator';

export class LoginDto {

  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  readonly password: string;
}

export class UserDto {
  @IsNotEmpty()
  readonly username: string;
  @IsNotEmpty()
  readonly email: string;
  @IsNotEmpty()
  readonly password: string;
  readonly avatar?: string;
  readonly mobile?: string;
}