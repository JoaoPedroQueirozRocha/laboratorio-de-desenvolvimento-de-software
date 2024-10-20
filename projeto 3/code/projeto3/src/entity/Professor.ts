import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';
import { Account } from './Account';

@Entity()
export class Professor {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ length: 11 })
	CPF: string;

	@Column({ length: 150 })
	department: string;

	@ManyToOne(() => User, (user) => user.professors)
	user: User;

	@ManyToOne(() => Account, (account) => account.professors)
	account: Account;

	@Column()
	institution_id: number;
}