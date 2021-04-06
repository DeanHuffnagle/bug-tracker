import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
	OneToMany,
} from 'typeorm';
import { Project } from './Project';
import { Comment } from './Comment';
import { User } from './User';

@Entity()
export class Ticket {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	title!: string;

	@Column()
	text!: string;

	@Column()
	priority!: number;

	@Column()
	status: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@ManyToOne(() => User, (user) => user.tickets)
	developer: User;

	@ManyToOne(() => Project, (project) => project.tickets)
	project: Project;

	@OneToMany(() => Comment, (comment) => comment.ticket)
	comments: Comment[];
}
