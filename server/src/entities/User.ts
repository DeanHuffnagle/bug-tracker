import {
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

@ObjectType()
@Entity()
export class User {
	//================================================================================
	//Columns
	//================================================================================
	@Field()
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column()
	firstName: string;

	@Field()
	@Column()
	lastName!: string;

	@Field()
	@Column()
	userRole!: string;

	@Field()
	@Column()
	email: string;

	@Column()
	password: string;

	@Field()
	@CreateDateColumn()
	createdAt: Date;

	@Field()
	@UpdateDateColumn()
	updatedAt: Date;

	//================================================================================
	//Relationships
	//================================================================================

	//// user to organization relationship ////
	@Field(() => Number)
	@ManyToOne(() => Organization, (organization) => organization.user)
	organization: Organization;

	//// user to assigned projects relationship ////
	@Field(() => Number)
	@ManyToMany(() => Project, (project) => project.developers)
	@JoinTable()
	assignments: Project;

	//// user to project  manager relationship ////
	@Field(() => Number)
	@OneToMany(() => Project, (project) => project.manager)
	projects: Project[];

	//// user to ticket relationship ////
	@Field(() => Number)
	@OneToMany(() => Ticket, (ticket) => ticket.developer)
	tickets: Ticket[];

	//// user to comment relationship ////
	@Field(() => Number)
	@OneToMany(() => Comment, (comment) => comment.user)
	comments: Comment[];
}
