import { CreateTodoDto } from './application/dto/create-todo.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TodoService } from './application/services/todo.service';
import { GetUser } from 'src/auth/common/get-user.dacorator';
import { User } from 'src/auth/domain/entity/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { ObjectId } from 'mongoose';

@Controller('todo')
@UseGuards(AuthGuard())
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get('/:todoid')
  async getTodo(@Param('todoid') todoId: ObjectId) {
    return this.todoService.getTodoById(todoId);
  }

  @Get()
  async getTodos(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    if (startDate && endDate) {
      return this.todoService.filterTodo(startDate, endDate);
    }
    return this.todoService.getTodo();
  }

  @Delete('/:todoid')
  async deleteTodo(@Param('todoid') id: ObjectId) {
    console.log(id);
    return this.todoService.deleteTodo(id);
  }

  @Post()
  async createTodo(
    @Body() createTodoDto: CreateTodoDto,
    @GetUser() user: User,
  ) {
    return this.todoService.createTodo(createTodoDto, user);
  }

  @Patch('/:todoId')
  async updateTodo(
    @Param('todoId') id: ObjectId,
    @Body() updateTodo: CreateTodoDto,
  ) {
    return this.todoService.updateTodo(id, updateTodo);
  }
}
