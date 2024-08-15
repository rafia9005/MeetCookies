import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { PostsModule } from './posts/posts.module';
import { LikeModule } from './like/like.module';

@Module({
  imports: [AuthModule, DatabaseModule, PostsModule, LikeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
