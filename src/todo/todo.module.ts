import { TypeOrmModule } from '@nestjs/typeorm';
// import { Todo, TodoSchema } from './domain/entity/todo.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './application/services/todo.service';
import { TodoRepository } from './todo.repository';
import { MongoRepository } from 'typeorm';
import { PassportModule } from '@nestjs/passport';
import { Todo } from './domain/entity/todo.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    // MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }]),
    TypeOrmModule.forFeature([Todo]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    AuthModule,
  ],
  controllers: [TodoController],
  providers: [TodoService, MongoRepository],
})
export class TodoModule {}
