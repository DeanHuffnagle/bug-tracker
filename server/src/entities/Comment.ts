import { Field, Int, ObjectType } from 'type-graphql';
import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
	BaseEntity,
} from 'typeorm';
import { Ticket } from './Ticket';
import { User } from './User';

@ObjectType()
@Entity()
export class Comment extends BaseEntity {
	//================================================================================
	//Columns
	//================================================================================
	@Field()
	@PrimaryGeneratedColumn()
	id!: number;

	@Field()
	@Column()
	text!: string;

	@Field(() => Int)
	@Column()
	commenterId!: number;

	@Field(() => Int)
	@Column()
	ticketId!: number;

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
	@Field(() => User)
	@ManyToOne(() => User, (user) => user.comments, {
		cascade: ['insert', 'update'],
		onDelete: 'CASCADE',
	})
	commenter: User;

	//// comments to ticket relationship ////
	@Field(() => Ticket)
	@ManyToOne(() => Ticket, (ticket) => ticket.comments, {
		cascade: ['insert', 'update'],
		onDelete: 'CASCADE',
	})
	ticket: Ticket;
}
