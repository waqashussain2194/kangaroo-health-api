import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, UseGuards } from '@nestjs/common';
import { CreateAccountDto } from '../account/dto/create-account.dto';
import { AccountCreationResponse } from '../account/entities/account.entity';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() createAccountDto: CreateAccountDto) : Promise<AccountCreationResponse> {
    return this.authService.create(createAccountDto);
  }

  @Post('login')
  login(@Body() createAccountDto: CreateAccountDto) : Promise<AccountCreationResponse> {
    return this.authService.validate(createAccountDto);
  }
}
