import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  async create(@Body() createTodoDto: CreateTodoDto) {
    return { data: await this.todosService.create(createTodoDto) };
  }

  @Get()
  async findAll() {
    return { data: await this.todosService.findAll() };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return { data: await this.todosService.findOne(id) };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return { data: await this.todosService.update(id, updateTodoDto) };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return { data: await this.todosService.remove(id) };
  }
}
