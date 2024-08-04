import { Module } from '@nestjs/common';
import { TodosModule } from './features/todos/todos.module';
import { PrismaModule } from './core/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { HahaModule } from './haha/haha.module';

@Module({
  imports: [
    TodosModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HahaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
