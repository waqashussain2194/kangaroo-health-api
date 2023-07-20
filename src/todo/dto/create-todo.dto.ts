import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateTodoDto {
  @ApiProperty({
    description: 'Title of Todo',
    example: 'My Todo'
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Description of Todo',
    example: 'My Todo is amazing'
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Is completed',
    example: false
  })
  @IsNotEmpty()
  completed: boolean;
}