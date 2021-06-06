import { Field, Int, ObjectType } from 'type-graphql';
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	ManyToMany,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
	RelationId,
	UpdateDateColumn,
} from 'typeorm';
import { Comment } from './Comment';
import { Organization } from './Organization';
import { Project } from './Project';
import { Ticket } from './Ticket';

export type UserRoleType =
	| 'admin'
	| 'projectManager'
	| 'developer'
	| 'submitter'
	| 'demoAdmin'
	| 'demoProjectManager'
	| 'demoDeveloper'
	| 'demoSubmitter';

export type UserExperienceType = 'new' | 'old';

@ObjectType()
@Entity()
export class User extends BaseEntity {
	//================================================================================
	//Columns
	//================================================================================
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id!: number;

	@Field()
	@Column()
	firstName!: string;

	@Field()
	@Column()
	lastName!: string;

	@Field()
	@Column({ unique: true })
	email!: string;

	@Field(() => String)
	@Column({
		type: 'enum',
		enum: [
			'admin',
			'projectManager',
			'developer',
			'submitter',
			'demoAdmin',
			'demoProjectManager',
			'demoDeveloper',
			'demoSubmitter',
		],
		default: 'developer',
	})
	role!: UserRoleType;
	// everyone will start as a developer by default.
	// when an organization is created the creator will be switched to the admin role.
	// only admins can change the role of other users in their organization.

	@Field(() => String)
	@Column({
		type: 'enum',
		enum: ['new', 'old'],
		default: 'new',
	})
	userExperience!: UserExperienceType;

	@Column()
	password!: string;

	@Field(() => Int, { nullable: true })
	@Column({ nullable: true })
	organizationId: number;

	@Field(() => [Int], { nullable: true })
	@Column({ nullable: true })
	assignedTicketsId: number;

	@Field(() => String)
	@CreateDateColumn()
	createdAt: Date;

	@Field(() => String)
	@UpdateDateColumn()
	updatedAt: Date;

	//================================================================================
	//Relationships
	//================================================================================
	//// user to assigned projects relationship ////
	// the user will not be assigned to projects, unless an admin assigns them.
	@Field(() => [Project], { nullable: true })
	@ManyToMany(() => Project, (project) => project.assignedDevelopers, {
		cascade: ['insert', 'update'],
		onDelete: 'SET NULL',
	})
	assignedProjects: Project[] | null;

	@Field(() => [Int], { nullable: true })
	@RelationId((user: User) => user.assignedProjects)
	assignedProjectIds: number[];

	//// user to organization relationship ////
	// the user will be default not in an organization when creating their account.
	// they will then have to be invited into an organization by an admin sending an email with a link to join.
	@Field(() => Organization, { nullable: true })
	@ManyToOne(() => Organization, (organization) => organization.users, {
		cascade: ['insert', 'update'],
		onDelete: 'SET NULL',
	})
	organization: Organization | null;

	//// Join Request ////
	@Field(() => Organization, { nullable: true })
	@ManyToOne(() => Organization, (organization) => organization.joinRequests, {
		cascade: ['insert', 'update'],
		onDelete: 'SET NULL',
	})
	joinRequest: Organization | null;

	@Field(() => Int, { nullable: true })
	@RelationId((user: User) => user.joinRequest)
	joinRequestId: number;

	//// Project manager to project relationship ////

	@Field(() => [Project], { nullable: true })
	@OneToMany(() => Project, (project) => project.manager, {
		cascade: ['insert', 'update'],
		onDelete: 'SET NULL',
	})
	managedProjects: Project[] | null;

	@Field(() => [Int], { nullable: true })
	@RelationId((user: User) => user.managedProjects)
	managedProjectIds: number[];

	//// Ticket manager to ticket relationship ////
	@Field(() => [Ticket], { nullable: true })
	@OneToMany(() => Ticket, (ticket) => ticket.manager, {
		cascade: ['insert', 'update'],
		onDelete: 'SET NULL',
	})
	managedTickets: Ticket[] | null;

	@Field(() => [Int], { nullable: true })
	@RelationId((user: User) => user.managedTickets)
	managedTicketIds: number[];

	//// owner relationship with created organization ////
	@Field(() => Organization, { nullable: true })
	@OneToOne(() => Organization, (organization) => organization.owner, {
		cascade: ['insert', 'update'],
		onDelete: 'SET NULL',
	})
	ownedOrganization: Organization | null;

	@Field(() => Int, { nullable: true })
	@RelationId((user: User) => user.ownedOrganization)
	ownedOrganizationId: number;

	//// User to submitted tickets relationship  ////
	@Field(() => [Ticket], { nullable: true })
	@OneToMany(() => Ticket, (ticket) => ticket.submitter, {
		cascade: ['insert', 'update'],
		onDelete: 'SET NULL',
	})
	submittedTickets: Ticket[] | null;

	//// User to comment relationship ////
	@Field(() => Comment, { nullable: true })
	@OneToMany(() => Comment, (comment) => comment.commenter, {
		cascade: ['insert', 'update'],
		onDelete: 'SET NULL',
	})
	comments: Comment[] | null;

	//// User to assigned ticket relationship ////
	@Field(() => [Ticket], { nullable: true })
	@OneToMany(() => Ticket, (ticket) => ticket.assignedDeveloper, {
		cascade: ['insert', 'update'],
		onDelete: 'SET NULL',
	})
	assignedTickets: Ticket[] | null;
}
