import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateAccountDto } from './dto/update-account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AccountService {
  constructor (
    @InjectRepository(Account) private accountRepository: Repository<Account>,
  ) {}

  async findAll() : Promise<Account[]> {
    return await this.accountRepository.find();
  }

  async findOne(id: number) : Promise<Account> {
    const account = await this.accountRepository.findOne({
      where: {
        id: id
      },
      relations: ['todos']
    })

    if (!account) {
      throw new HttpException({
        message: `${`Account not found with id ${id}`}`
      }, HttpStatus.NOT_FOUND)
    }

    return account   
  }

  async update(id: number, updateAccountDto: UpdateAccountDto) : Promise<Account> {
    await this.findOne(id);

    await this.accountRepository.update(id, updateAccountDto).catch((err: any) => {
      throw new HttpException({
        message: `${err}`
      }, HttpStatus.CONFLICT)
    })
    return await this.findOne(id);
  }

  async remove(id: number) : Promise<Object> {
    await this.findOne(id)

    return await this.accountRepository.delete(id);
  }
}
