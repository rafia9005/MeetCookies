import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { DatabaseModule } from 'src/database/database.module';
import { ClientsModule } from '@nestjs/microservices';
import { rabbitMQConfig } from 'src/configs/rabbitmq';

@Module({
  imports: [DatabaseModule, ClientsModule.register(rabbitMQConfig)],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
