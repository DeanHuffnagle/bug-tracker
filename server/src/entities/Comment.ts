import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
} from 'typeorm';
import { Ticket } from './Ticket';
import { User } from './User';

@Entity()
export class Comment {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => User, (user) => user.id)
	user: User;

	@ManyToOne(() => Ticket, (ticket) => ticket.id)
	ticket: Ticket;

	@Column()
	commentText!: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
