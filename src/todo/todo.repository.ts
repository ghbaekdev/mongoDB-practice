import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Todo, TodoDocument } from 'src/todo/domain/entity/todo.schema';

@Injectable()
export class TodoRepository {
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

  async findOne(todoFilterQuery: FilterQuery<Todo>): Promise<Todo> {
    return this.todoModel.findOne(todoFilterQuery);
  }

  async find(todoFilterQuery: FilterQuery<Todo>): Promise<Todo[]> {
    return this.todoModel.find(todoFilterQuery);
  }

  async create(todo: Todo): Promise<Todo> {
    const newTodo = new this.todoModel(todo);
    return newTodo.save();
  }

  async findOneAndUpdate(
    todoFilterQuery: FilterQuery<Todo>,
    todo: Partial<Todo>,
  ): Promise<Todo> {
    return this.todoModel.findOneAndUpdate(todoFilterQuery, todo);
  }
}
