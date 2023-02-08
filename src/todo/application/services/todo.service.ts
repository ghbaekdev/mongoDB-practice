import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/domain/entity/user.entity';
import { Todo } from 'src/todo/domain/entity/todo.entity';

import { MongoRepository } from 'typeorm';
import { TodoRepository } from '../../todo.repository';

import { CreateTodoDto } from '../dto/create-todo.dto';
// import { User } from 'src/auth/domain/entity/user.entity';

@Injectable()
export class TodoService {
  constructor(
    // private readonly todoRepository: TodoRepository,
    @InjectRepository(Todo)
    private todoRepository: MongoRepository<Todo>,
  ) {}

  async getTodoById(id: string) {
    const found = await this.todoRepository.findOneBy({ id });
    console.log(found);
  }

  async getTodo() {
    return this.todoRepository.find();
  }

  async createTodo(todo: CreateTodoDto, user: User) {
    const { title, description } = todo;
    // return this.todoRepository.create({
    //   title: todo.title,
    //   description: todo.description,
    //   name: todo.title,
    // });
    const result = this.todoRepository.create({
      title,
      description,
      user,
    });

    await this.todoRepository.save(result);
  }

  async updateTodo(todoId: string, updateTodoDto: CreateTodoDto) {
    return this.todoRepository.findOneAndUpdate({ todoId }, updateTodoDto);
  }

  async filterTodo(startDate: string, endDate: string) {
    // return this.todoRepository.find({
    //   createdAt: {
    //     $gte: startDate,
    //     $lte: endDate,
    //   },
    // });
    return 'say';
  }
}
