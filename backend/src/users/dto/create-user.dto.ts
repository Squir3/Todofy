import { IsString, IsEmail, IsNotEmpty, IsEmpty } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly username: string;
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
  @IsNotEmpty()
  @IsString()
  readonly password: string;
  @IsEmpty()
  readonly refreshedToken: string;
}
