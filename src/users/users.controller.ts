import { Controller, Get, Req, UseGuards, HttpCode } from '@nestjs/common';
import { Request } from 'express';
import { DatabaseService } from 'src/database/database.service';
import { JwtPayload } from 'src/middleware/jwt.strategy';
import { JwtAuthGuard } from 'src/middleware/jwt.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly Db: DatabaseService) {}

  @Get('/profile')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() request: Request): { data: JwtPayload } {
    const user = request.user as JwtPayload;
    return {
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    };
  }
}
