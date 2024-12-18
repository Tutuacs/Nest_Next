import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async existProfile(id: string) {
    return this.profile.findUnique({
      where: {
        id,
      },
    });
  }

  async existProfileEmail(email: string) {
    return this.profile.findUnique({
      where: {
        email,
      },
    });
  }

}
