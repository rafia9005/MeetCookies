import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class PostsService {
  constructor(private readonly Db: DatabaseService) {}
  async create(createPostDto: Prisma.PostCreateInput) {
    try {
      return await this.Db.post.create({
        data: createPostDto,
        include: {
          LikePost: true,
          CommentPost: true,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Posts with the same name already exists.');
      } else {
        throw new InternalServerErrorException(
          'An unexpected error occurred while creating the product.',
        );
      }
    }
  }

  async findAll() {
    try {
      const posts = await this.Db.post.findMany({
        include: {
          LikePost: true,
          CommentPost: true,
        },
      });

      return posts.map((post) => ({
        id: post.id,
        content: post.content,
        like: post.LikePost,
        comment: post.CommentPost,
        created_at: post.created_at,
        updated_at: post.updated_at,
      }));
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve posts');
    }
  }

  async findOne(id: number) {
    try {
      const posts = await this.Db.post.findUnique({
        where: {
          id,
        },
      });

      if (!posts) {
        return {
          status: false,
          statusCode: 404,
          message: 'posts not found in id : ${id}',
        };
      } else {
        return posts;
      }
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve posts');
    }
  }

  async update(id: number, updatePostDto: Prisma.PostUpdateInput) {
    try {
      return await this.Db.post.update({
        where: {
          id,
        },
        data: updatePostDto,
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to update posts');
    }
  }

  async remove(id: number) {
    try {
      return await this.Db.post.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to remove posts');
    }
  }
}
