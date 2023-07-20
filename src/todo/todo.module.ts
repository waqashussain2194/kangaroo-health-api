import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { AccountService } from 'src/account/account.service';
import { Account } from 'src/account/entities/account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Todo, Account])],
  controllers: [TodoController],
  providers: [TodoService, AccountService]
})
export class TodoModule {}
