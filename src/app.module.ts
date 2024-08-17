import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { PostsModule } from './posts/posts.module';
import { JwtModule } from '@nestjs/jwt';
import { UsersController } from './users/users.controller';

@Module({
  imports: [AuthModule, DatabaseModule, PostsModule, JwtModule],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule {}
