import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	JoinTable,
	ManyToMany,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { Organization } from './Organization';
import { Project } from './Project';
import { Ticket } from './Ticket';
import { Comment } from './Comment';
import { Field, ObjectType } from 'type-graphql';

export type UserRoleType =
	| 'admin'
	| 'projectManager'
	| 'developer'
	| 'submitter'
	| 'demoAdmin'
	| 'demoProjectManager'
	| 'demoDeveloper'
	| 'demoSubmitter';

@ObjectType()
@Entity()
export class User extends BaseEntity {
	//================================================================================
	//Columns
	//================================================================================
	@Field()
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

	@Field()
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

	@Column()
	password!: string;

	@Field(() => String)
	@CreateDateColumn()
	createdAt: Date;

	@Field(() => String)
	@UpdateDateColumn()
	updatedAt: Date;

	//================================================================================
	//Relationships
	//================================================================================

	//// user to organization relationship ////
	// the user will be default not in an organization when creating their account.
	// they will then have to be invited into an organization by an admin sending an email with a link to join.
	@Field(() => Number, { nullable: true })
	@ManyToOne(() => Organization, (organization) => organization.user)
	organization: Organization | null;

	//// user to assigned projects relationship ////
	// the user will not be assigned to projects, unless an admin assigns them.
	@Field(() => Number, { nullable: true })
	@ManyToMany(() => Project, (project) => project.developers)
	@JoinTable()
	assignments: Project | null;

	//// Project manager to project relationship ////
	@Field(() => Number, { nullable: true })
	@OneToMany(() => Project, (project) => project.manager)
	projects: Project[] | null;

	//// user to assigned ticket relationship ////
	@Field(() => Number, { nullable: true })
	@OneToMany(() => Ticket, (ticket) => ticket.developer)
	tickets: Ticket[] | null;

	//// user to comment relationship ////
	@Field(() => Number, { nullable: true })
	@OneToMany(() => Comment, (comment) => comment.user)
	comments: Comment[] | null;
}
