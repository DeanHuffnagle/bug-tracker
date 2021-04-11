import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
	OneToMany,
	BaseEntity,
} from 'typeorm';
import { Project } from './Project';
import { Comment } from './Comment';
import { User } from './User';
import { Field, Int, ObjectType } from 'type-graphql';

export type TicketPriorityType = 'low' | 'medium' | 'high';

export type TicketStatusType =
	| 'unassigned'
	| 'inProgress'
	| 'awaitingConfirmation'
	| 'resolved';

@ObjectType()
@Entity()
export class Ticket extends BaseEntity {
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

	@Field(() => Int, { nullable: true })
	@Column({ nullable: true })
	developerId: number;

	@Field(() => Int)
	@Column()
	creatorId: number;

	@Field(() => Int)
	@Column()
	projectId!: number;

	@Field()
	@Column({
		type: 'enum',
		enum: ['low', 'medium', 'high'],
		default: 'high',
	})
	priority!: TicketPriorityType;

	@Field()
	@Column({
		type: 'enum',
		enum: ['unassigned', 'inProgress', 'awaitingConfirmation', 'resolved'],
		default: 'unassigned',
	})
	status!: TicketStatusType;

	@Field(() => String)
	@CreateDateColumn()
	createdAt: Date;

	@Field(() => String)
	@UpdateDateColumn()
	updatedAt: Date;

	//================================================================================
	//Relationships
	//================================================================================

	//// tickets to assigned developer relationship ////
	@Field(() => Number, { nullable: true })
	@ManyToOne(() => User, (user) => user.tickets, { onDelete: 'SET NULL' })
	developer: User | null;

	//// Ticket to creator relationship ////
	@Field(() => Number, { nullable: true })
	@ManyToOne(() => User, (user) => user.submissions, { onDelete: 'SET NULL' })
	creator: User | null;

	//// Tickets to project relationship ////
	@Field(() => Number)
	@ManyToOne(() => Project, (project) => project.tickets, {
		onDelete: 'CASCADE',
	})
	project!: Project;

	//// Ticket to comments relationship ////
	@Field(() => Number, { nullable: true })
	@OneToMany(() => Comment, (comment) => comment.ticket)
	comments: Comment[] | null;
}
