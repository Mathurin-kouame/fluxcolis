import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [AuthModule, UsersModule, PrismaModule],
  controllers: [AppController, AuthController],
  providers: [AppService, PrismaService, AuthService],
  exports: [AuthService],
})
export class AppModule {}
