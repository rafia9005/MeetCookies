import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class PostsService {
  constructor(
    private readonly Db: DatabaseService,
    @Inject('EMAIL_SERVICE') private readonly client: ClientProxy,
  ) {}

  async create(createPostDto: Prisma.PostCreateInput) {
    try {
      const post = await this.Db.post.create({
        data: createPostDto,
        include: {
          LikePost: true,
          CommentPost: true,
        },
      });
      return {
        status: true,
        statusCode: HttpStatus.CREATED,
        data: post,
      };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new HttpException(
          'Posts with the same name already exists.',
          HttpStatus.CONFLICT,
        );
      } else {
        throw new HttpException(
          'An unexpected error occurred while creating the post.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async findAll() {
    try {
      const posts = await this.Db.post.findMany({
        include: {
          _count: {
            select: {
              LikePost: true,
              CommentPost: true,
            },
          },
        },
      });

      return {
        status: true,
        statusCode: HttpStatus.OK,
        data: posts.map((post) => ({
          id: post.id,
          content: post.content,
          like: post._count.LikePost,
          comment: post._count.CommentPost,
          created_at: post.created_at,
          updated_at: post.updated_at,
        })),
      };
    } catch (error) {
      throw new HttpException(
        'Failed to retrieve posts',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number) {
    try {
      const post = await this.Db.post.findUnique({
        where: { id },
        include: {
          _count: {
            select: {
              LikePost: true,
              CommentPost: true,
            },
          },
          CommentPost: true,
        },
      });

      if (!post) {
        throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
      }

      return {
        status: true,
        statusCode: HttpStatus.OK,
        data: {
          id: post.id,
          content: post.content,
          like: post._count.LikePost,
          comment: post._count.CommentPost,
          all_comment: post.CommentPost,
          created_at: post.created_at,
          updated_at: post.updated_at,
        },
      };
    } catch (error) {
      throw new HttpException(
        'Failed to retrieve post',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, updatePostDto: Prisma.PostUpdateInput) {
    try {
      const updatedPost = await this.Db.post.update({
        where: { id },
        data: updatePostDto,
      });

      return {
        status: true,
        statusCode: HttpStatus.OK,
        data: updatedPost,
      };
    } catch (error) {
      throw new HttpException(
        'Failed to update post',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number) {
    try {
      await this.Db.post.delete({
        where: { id },
      });

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

  async likePosts(postId: number, userId: number) {
    const [user, post] = await Promise.all([
      this.Db.user.findUnique({ where: { id: userId } }),
      this.Db.post.findUnique({ where: { id: postId } }),
    ]);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (!post) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }

    await this.Db.likePost.create({
      data: {
        user: { connect: { id: userId } },
        post: { connect: { id: postId } },
      },
    });

    return { status: true };
  }

  //async sendEmailLike(data: any) {
  //  try {
  //    const result = await this.client.send('email', data).toPromise();
  //    return result;
  //  } catch (error) {
  //    Logger.log(error);
  //    throw new error();
  //  }
  //}
}
