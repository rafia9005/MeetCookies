import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  NotFoundException,
  ConflictException,
  HttpException,
  UseGuards,
  Req,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CommentPostDto, CreatePostsDto } from './dto/posts.dto';
import { Prisma } from '@prisma/client';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/middleware/jwt.guard';

@Controller('api/posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createPostDto: CreatePostsDto) {
    try {
      const result = await this.postsService.create(createPostDto);
      return {
        status: true,
        statusCode: HttpStatus.CREATED,
        data: result.data,
      };
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException(error.message);
      }
      throw new ConflictException('Failed to create post.');
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    try {
      const result = await this.postsService.findAll();
      return {
        status: true,
        statusCode: HttpStatus.OK,
        data: result.data,
      };
    } catch (error) {
      throw new HttpException(
        'Failed to retrieve posts',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    try {
      const result = await this.postsService.findOne(+id);
      if (!result.data) {
        throw new NotFoundException('Post not found');
      }
      return result;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new HttpException(
        'Failed to retrieve post',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() updatePostDto: Prisma.PostUpdateInput,
  ) {
    try {
      const result = await this.postsService.update(+id, updatePostDto);
      return {
        status: true,
        statusCode: HttpStatus.OK,
        data: result.data,
      };
    } catch (error) {
      throw new HttpException(
        'Failed to update post',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    try {
      await this.postsService.remove(+id);
      return {
        status: true,
        statusCode: HttpStatus.NO_CONTENT,
        message: 'Post successfully deleted',
      };
    } catch (error) {
      throw new HttpException(
        'Failed to remove post',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id/like')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async likePost(@Param('id') postId: string, @Req() request: Request) {
    const user = request.user;
    try {
      const result = await this.postsService.likePosts(+postId, user.id);
      return { data: result };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new HttpException(
        'Failed to like post',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/comment')
  @HttpCode(HttpStatus.OK)
  async commentPosts(
    @Param('id') postId: string,
    @Req() request: Request,
    commentDto: CommentPostDto,
  ) {
    const user = request.user;
    try {
      const result = await this.postsService.commentPosts(
        +postId,
        user.id,
        commentDto.content,
      );
      return result;
    } catch (error) {
      throw new error();
    }
  }

  //@Post('test')
  //@MessagePattern("email")
  //handleTest() {
  //  const data = {
  //    id: 1,
  //    email: "rafia9005@gmail.com",
  //    message: "hello world"
  //  }
  //  Logger.log(this.postsService.sendEmailLike(data))
  //}
}
