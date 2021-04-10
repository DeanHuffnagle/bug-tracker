import { Field, ObjectType } from 'type-graphql';
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
	@PrimaryGeneratedColumn()
	id!: number;

	@Field()
	@Column()
	commentText!: string;

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
	@ManyToOne(() => User, (user) => user.comments, { onDelete: 'CASCADE' })
	user: User;

	//// comments to ticket relationship ////
	@Field()
	@ManyToOne(() => Ticket, (ticket) => ticket.comments, { onDelete: 'CASCADE' })
	ticket: Ticket;
}
