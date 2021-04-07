import { Field, ObjectType } from 'type-graphql';
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

@ObjectType()
@Entity()
export class Comment {
	//================================================================================
	//Columns
	//================================================================================
	@PrimaryGeneratedColumn()
	id!: number;

	@Field()
	@Column()
	commentText: string;

	@Field(() => String)
	@CreateDateColumn()
	createdAt: Date;

	@Field(() => String)
	@UpdateDateColumn()
	updatedAt: Date;

	//================================================================================
	//Relationships
	//================================================================================

	//// comments to user relationship ////
	@Field()
	@ManyToOne(() => User, (user) => user.comments)
	user: User;

	//// comments to ticket relationship ////
	@Field()
	@ManyToOne(() => Ticket, (ticket) => ticket.comments)
	ticket: Ticket;
}
