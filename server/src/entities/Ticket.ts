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
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
@Entity()
export class Ticket {
	//================================================================================
	//Columns
	//================================================================================

	@Field()
	@PrimaryGeneratedColumn()
	id!: number;

	@Field()
	@Column()
	title!: string;

	@Field()
	@Column()
	text!: string;

	@Field()
	@Column()
	priority!: number;

	@Field()
	@Column()
	status: string;

	@Field()
	@CreateDateColumn()
	createdAt: Date;

	@Field()
	@UpdateDateColumn()
	updatedAt: Date;

	//================================================================================
	//Relationships
	//================================================================================

	//// tickets to user relationship ////
	@Field()
	@ManyToOne(() => User, (user) => user.tickets)
	developer: User;

	//// Tickets to project relationship ////
	@Field(() => Number)
	@ManyToOne(() => Project, (project) => project.tickets)
	project: Project;

	//// Ticket to comments relationship ////
	@Field(() => Number)
	@OneToMany(() => Comment, (comment) => comment.ticket)
	comments: Comment[];
}
