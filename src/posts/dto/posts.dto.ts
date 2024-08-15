import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePostsDto {
  @IsString()
  @IsNotEmpty({ message: 'content is required' })
  content: string;
}
