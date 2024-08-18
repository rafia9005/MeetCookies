import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/middleware/jwt.guard';
import { updateUserDto } from './dto/users.dto';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  get(@Req() req: Request) {
    const user = req.user;

    return this.usersService.get(+user.id, user.username, user.email);
  }

  @Patch('update')
  @UseGuards(JwtAuthGuard)
  update(@Req() req: Request, @Body() updateDto: updateUserDto) {
    const user = req.user;

    return this.usersService.update(
      user.id,
      user.username,
      user.email,
      updateDto,
    );
  }
}
