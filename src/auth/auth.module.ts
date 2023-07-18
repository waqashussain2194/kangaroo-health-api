import { Module } from '@nestjs/common';
import { AccountService } from 'src/account/account.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'src/account/entities/account.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.register({
      secret: "pqowjncencewoqndeiwecew",
    }),
    TypeOrmModule.forFeature([Account]),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, AccountService, JwtStrategy],
})
export class AuthModule {}
