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
import { Organization } from './Organization';

export type TicketPriorityType = 'low' | 'medium' | 'high';

export type TicketStatusType =
	| 'unassigned'
	| 'inProgress'
	| 'awaitingConfirmation'
	| 'resolved';

export type TicketTypeType =
	| 'bugOrError'
	| 'featureRequest'
	| 'other'
	| 'trainingRequest';

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

	@Field()
	@Column({
		type: 'enum',
		enum: ['bugOrError', 'featureRequest', 'other', 'trainingRequest'],
		default: 'other',
	})
	type!: TicketTypeType;

	@Field(() => Int, { nullable: true })
	@Column({ nullable: true })
	assignedDeveloperId: number;

	@Field(() => Int)
	@Column()
	projectId!: number;

	@Field(() => Int, { nullable: true })
	@Column({ nullable: true })
	managerId: number | null;

	@Field(() => Int, { nullable: true })
	@Column({ nullable: true })
	submitterId: number | null;

	@Field(() => Int)
	@Column()
	organizationId!: number;

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
	@Field(() => User, { nullable: true })
	@ManyToOne(() => User, (user) => user.assignedTickets, {
		cascade: ['insert', 'update'],
		onDelete: 'SET NULL',
	})
	assignedDeveloper: User | null;

	//// Ticket to creator relationship ////
	@Field(() => User)
	@ManyToOne(() => User, (user) => user.submittedTickets, {
		cascade: ['insert', 'update'],
		onDelete: 'CASCADE',
	})
	submitter!: User;

	//// Tickets to project relationship ////
	@Field(() => Project)
	@ManyToOne(() => Project, (project) => project.tickets, {
		cascade: ['insert', 'update'],
		onDelete: 'CASCADE',
	})
	project!: Project;

	//// Tickets to organization relationship ////
	@Field(() => Organization)
	@ManyToOne(() => Organization, (organization) => organization.tickets, {
		cascade: ['insert', 'update'],
		onDelete: 'CASCADE',
	})
	organization!: Organization;

	//// Project to project manager relationship ////
	@Field(() => User, { nullable: true })
	@ManyToOne(() => User, (user) => user.managedTickets, {
		cascade: ['insert', 'update'],
		onDelete: 'SET NULL',
	})
	manager: User | null;

	//// Ticket to comments relationship ////
	@Field(() => Comment, { nullable: true })
	@OneToMany(() => Comment, (comment) => comment.ticket, {
		cascade: ['insert', 'update'],
		onDelete: 'SET NULL',
	})
	comments: Comment[] | null;
}
