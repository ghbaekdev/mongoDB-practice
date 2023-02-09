import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongoose';
import { User } from 'src/auth/domain/entity/user.entity';
import { Todo } from 'src/todo/domain/entity/todo.entity';
import { MongoRepository } from 'typeorm';
import { CreateTodoDto } from '../dto/create-todo.dto';
// import { User } from 'src/auth/domain/entity/user.entity';

@Injectable()
export class TodoService {
  constructor(
    // private readonly todoRepository: TodoRepository,
    @InjectRepository(Todo)
    private todoRepository: MongoRepository<Todo>,
  ) {}

  async getTodoById(id: ObjectId) {
    const found = await this.todoRepository.findOneBy(id);
    return found;
  }

  async getTodo() {
    return this.todoRepository.find();
  }

  async createTodo(todo: CreateTodoDto, user: User) {
    const { title, description } = todo;
    const result = this.todoRepository.create({
      title,
      description,
      user,
    });
    return await this.todoRepository.save(result);
  }

  async updateTodo(id: ObjectId, updateTodoDto: CreateTodoDto) {
    const result = await this.todoRepository.updateOne(
      { id },
      {
        $set: {
          title: updateTodoDto.title,
          description: updateTodoDto.description,
        },
      },
    );
    console.log(result);
    return result;
  }

  async deleteTodo(id: ObjectId) {
    const result = await this.todoRepository.findOneAndDelete({ id });
    console.log(result);
    if (!result) {
      throw new NotFoundException(`이 아이디는 찾을 수 없음.${id}`);
    }
    return result;
  }

  async filterTodo(startDate: string, endDate: string) {
    return await this.todoRepository.findBy({
      createdAt: {
        $gte: new Date(startDate),
        $lt: new Date(endDate),
      },
    });
  }
}
