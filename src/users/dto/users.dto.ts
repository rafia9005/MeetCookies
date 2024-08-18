import {
  IsOptional,
  IsString,
  IsEmail,
  IsNotEmpty,
  IsInt,
  Min,
} from 'class-validator';

export class updateUserDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  id?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  username?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  password?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsString()
  avatar?: string;
}
