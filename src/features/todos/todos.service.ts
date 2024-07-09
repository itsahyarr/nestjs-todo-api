import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { PrismaService } from '../../core/prisma/prisma.service';
import { BadRequestException } from '../../core/exceptions';

@Injectable()
export class TodosService {
  constructor(private prismaService: PrismaService) { }

  async create(createTodoDto: CreateTodoDto) {
    try {
      const todo = await this.prismaService.todo.create({
        data: {
          ...createTodoDto,
        },
      });

      return todo;
    } catch (error) {
      throw new BadRequestException('failed to create todo');
    }
  }

  async findAll() {
    try {

      const todos = await this.prismaService.todo.findMany();

      return todos;
    } catch (error) {
      throw new InternalServerErrorException('can\'t fetch todos');
    }

  }

  async findOne(id: string) {
    try {

      const todo = await this.prismaService.todo.findUnique({
        where: {
          id: id,
        },
      });

      return todo;
    } catch (error) {
      throw new BadRequestException('id not found')
    }

  }

  async update(id: string, updateTodoDto: UpdateTodoDto) {
    try {
      const todo = await this.prismaService.todo.update({
        where: {
          id: id,
        },
        data: {
          ...updateTodoDto,
        },
      });

      return todo;
    } catch (error) {
      throw new BadRequestException('id not found');
    }
  }

  async remove(id: string) {
    try {
      const todo = await this.prismaService.todo.delete({
        where: {
          id: id,
        },
      });

      // const message :string = {}

      return { message: `${todo.id} deleted successfully` };
    } catch (error) {
      throw new BadRequestException('no id found or has been deleted!');
    }
  }
}
