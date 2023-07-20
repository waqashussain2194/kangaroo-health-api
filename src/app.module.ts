import { Module } from '@nestjs/common';
import { AccountModule } from './account/account.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TodoModule } from './todo/todo.module';
dotenv.config()

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: ['dist/**/*.entity{.js,.ts}'],
      synchronize: true
    }),
    AuthModule,
    AccountModule,
    TodoModule,
  ],
  controllers: [],
  providers: [JwtService],
})
export class AppModule {}
