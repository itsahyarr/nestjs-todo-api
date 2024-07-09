import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(configService: ConfigService) {
    super({
      datasourceUrl: configService.get('DATABASE_URL'),
    });
  }

  async cleanDb() {
    await this.todo.deleteMany();
  }
}
