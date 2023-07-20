import { Todo } from "src/todo/entities/todo.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


export interface AccountCreationResponse {
  account: Account;
  jwtToken: string | null;
}

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @OneToMany(() => Todo, todo => todo.account, { cascade: true }) // Add this line for the one-to-many relationship
  todos: Todo[];
}
