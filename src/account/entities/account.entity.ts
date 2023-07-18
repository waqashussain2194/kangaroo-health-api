import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


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
}
