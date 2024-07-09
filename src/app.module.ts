import { Module } from '@nestjs/common';
import { TodosModule } from './features/todos/todos.module';
import { PrismaModule } from './core/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TodosModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
