import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';
import { AccountService } from 'src/account/account.service';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private readonly todoRepository: Repository<Todo>,
    private accountService: AccountService
  ) {}

  async create(userId: number, createTodoDto: CreateTodoDto): Promise<Todo> {
    const user = await this.accountService.findOne(userId); // Find the User

    const todo = this.todoRepository.create({
      ...createTodoDto,
      account: user, // Set the relationship with the User
    })
    

    return this.todoRepository.save(todo).catch((err: any) => {
      throw new HttpException({
        message: `${err}`
      }, HttpStatus.CONFLICT)
    })
  }

  async findAll(): Promise<Todo[]> {
    return this.todoRepository.find({
      relations: ['account']
    });
  }

  async findOne(id: number): Promise<Todo> {
    return this.todoRepository.findOne({
      where: {
        id: id
      },
      relations: ['account']
    })
    .catch((err: any) => {
      throw new HttpException({
        message: `${err}`
      }, HttpStatus.NOT_FOUND)
    })
  }

  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const todo = await this.findOne(id);

    this.todoRepository.merge(todo, updateTodoDto);
    return this.todoRepository.save(todo);
  }

  async remove(id: number) {
    return await this.todoRepository.delete(id);
  }
}
