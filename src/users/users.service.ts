import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { updateUserDto } from './dto/users.dto';

@Injectable()
export class UsersService {
  constructor(private readonly Db: DatabaseService) {}

  async get(id: number, username: string, email: string) {
    try {
      const user = await this.Db.user.findUnique({
        where: { id, username, email },
        include: { Contact: true },
      });

      if (!user) {
        return {
          status: false,
          statusCode: 404,
          message: 'User not found',
        };
      }

      return {
        status: true,
        data: {
          username: user.username,
          email: user.email,
          contact: {
            name: user.Contact.name,
            bio: user.Contact.bio,
            avatar: user.Contact.avatar,
          },
        },
      };
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    idAuth: number,
    usernameAuth: string,
    emailAuth: string,
    updateUserDto: updateUserDto,
  ) {
    const { username, email, password, name, bio, avatar } = updateUserDto;

    const user = await this.Db.user.findUnique({
      where: {
        id: idAuth,
        username: usernameAuth,
        email: emailAuth,
      },
      include: { Contact: true },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    try {
      await this.Db.user.update({
        where: { id: idAuth },
        data: {
          username: username ?? user.username,
          email: email ?? user.email,
          password: password ?? user.password,
        },
      });

      if (name || bio || avatar) {
        await this.Db.contact.upsert({
          where: { users: idAuth },
          update: {
            name: name ?? user.Contact?.name,
            bio: bio ?? user.Contact?.bio,
            avatar: avatar ?? user.Contact?.avatar,
          },
          create: {
            name: name ?? user.Contact?.name,
            bio: bio ?? user.Contact?.bio,
            avatar: avatar ?? user.Contact?.avatar,
            users: idAuth,
          },
        });
      }

      const result = await this.Db.user.findUnique({
        where: { id: idAuth },
        include: { Contact: true },
      });

      return {
        username: result.username,
        email: result.email,
        contact: {
          name: result.Contact.name,
          bio: result.Contact.bio,
          avatar: result.Contact.avatar,
        },
      };
    } catch (error) {
      throw new HttpException(
        'Error updating user or contact',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
