import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePostsDto {
  @IsString()
  @IsNotEmpty({ message: 'content is required' })
  content: string;
}

export class CommentPostDto {
  @IsString()
  @IsNotEmpty({ message: 'content is required' })
  content: string;
}
