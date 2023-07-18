import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateAccountDto {
  @ApiProperty({
    description: 'Email of user',
    example: 'waqas@gmail.com'
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Password of user',
    example: 'Amp123@'
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
