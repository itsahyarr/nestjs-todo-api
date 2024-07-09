import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import * as pactum from 'pactum';
import { PrismaService } from '../src/core/prisma/prisma.service';
import { after, describe } from 'node:test';
import {
  CreateTodoDto,
  Extra,
} from '../src/features/todos/dto/create-todo.dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();
    await app.listen(3333);

    prismaService = app.get(PrismaService);
    await prismaService.cleanDb();

    pactum.request.setBaseUrl('http://localhost:3333');
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Todo', () => {
    const dto: CreateTodoDto = {
      title: 'My new Todo List',
      completed: false,
      priority: 'high',
      extra: {
        description: 'new todo list description',
        tags: ['tag1', 'tag2'],
      },
    };

    describe('Create todo', () => {
      it('Should create todo', async () => {
        return await pactum
          .spec()
          .post('/todos')
          .withBody(dto)
          .expectStatus(201)
          .inspect()
          .stores('todoId', 'data.id')
          .expectBodyContains(dto.title);
      });
    });

    describe('List todo', () => {
      it('Should list todo', async () => {
        return await pactum
          .spec()
          .get('/todos')
          .expectStatus(200)
          .inspect()
          .expectJsonLike({ data: [] })
          .expectJsonLength('data', 1)
      });
    });

    describe('Todo by id', () => {
      console.log('TODO_ID : $S{todoId}\n');
      it('Should show specific todo', async () => {
        return await pactum
          .spec()
          .get('/todos/{id}')
          .withPathParams('id', '$S{todoId}')
          .expectStatus(200)
          .inspect()
          .expectBodyContains('$S{todoId}');
      });
    });

    describe('Update todo', () => {
      it('Should update todo', async () => {
        return await pactum
          .spec()
          .patch('/todos/{id}')
          .withPathParams('id', '$S{todoId}')
          .withBody({ title: 'updated title xxx' })
          .expectBodyContains('updated title xxx')
          .expectStatus(200)
          .inspect();
      });
    });

    describe('Delete todo', () => {
      it('Should delete todo', async () => {
        return await pactum
          .spec()
          .delete('/todos/{id}')
          .withPathParams('id', '$S{todoId}')
          .expectJsonLike({ "data": {} })
          .expectStatus(200)
          .inspect();
      });
    });

    describe('Todos after delete', () => {
      it('Should return zero todo', async () => {
        return await pactum
          .spec()
          .get('/todos')
          .expectJsonLength('data', 0)
          .expectStatus(200)
          .inspect();
      });

    });
  });
});
