import { CreateTodoDto } from './application/dto/create-todo.dto';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Todo } from 'src/todo/domain/entity/todo.schema';
import { TodoService } from './application/services/todo.service';
import { GetUser } from 'src/auth/common/get-user.dacorator';
import { User } from 'src/auth/domain/entity/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get('/:userid')
  async getTodo(@Param('userid') todoId: string) {
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

  @Post()
  @UseGuards(AuthGuard())
  async createTodo(
    @Body() createTodoDto: CreateTodoDto,
    @GetUser() user: User,
  ) {
    return this.todoService.createTodo(createTodoDto, user);
  }

  @Patch('/:todoId')
  async updateTodo(
    @Param('todoId') todoId: string,
    @Body() updateTodo: CreateTodoDto,
  ) {
    return this.todoService.updateTodo(todoId, updateTodo);
  }
}
