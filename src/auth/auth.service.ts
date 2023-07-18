import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAccountDto } from '../account/dto/create-account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Account, AccountCreationResponse } from '../account/entities/account.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor (
    @InjectRepository(Account) private accountRepository: Repository<Account>,
    private jwtService: JwtService,
  ) {}

  async create(createAccountDto: CreateAccountDto) : Promise<AccountCreationResponse> {
    const user = await this.accountRepository.save(
      this.accountRepository.create(createAccountDto)
    )
    .catch((err: any) => {
      throw new HttpException({
        message: `${err}`
      }, HttpStatus.CONFLICT)
    })

    if (user) {
      const payload = { email: user.email, sub: user.id }
      const access_token = this.jwtService.sign(payload);
      return {
        account: user,
        jwtToken: access_token
      }
    } else {
      throw new HttpException({
        message: `User not created. Invalid credentials.`
      }, HttpStatus.CONFLICT)
    }
  }

  async validate(createAccountDto: CreateAccountDto): Promise<AccountCreationResponse> {
    const user = await this.accountRepository.findOne({
      where: {
        email: createAccountDto.email,
        password: createAccountDto.password
      }
    })
    .catch((err: any) => {
      throw new HttpException({
        message: `${err}`
      }, HttpStatus.NOT_FOUND)
    })

    if (user) {
      console.log(user)
      const payload = { email: user.email, sub: user.id }
      const access_token = this.jwtService.sign(payload);
      return {
        account: user,
        jwtToken: access_token
      }
    } else {
      throw new HttpException({
        message: `User not found. Invalid credentials.`
      }, HttpStatus.NOT_FOUND)
    }
  }

  async findOneWithEmail(email: string) : Promise<Account> {
    const account = await this.accountRepository.findOne({
      where: {
        email: email
      }
    })

    if (!account) {
      throw new HttpException({
        message: `${`Account not found with email ${email}`}`
      }, HttpStatus.NOT_FOUND)
    }

    return account   
  }
}
