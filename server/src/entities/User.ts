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

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	firstName: string;

	@Column()
	lastName!: string;

	@Column()
	userRole!: string;

	@Column()
	email: string;

	@Column()
	password: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	//// user to organization relationship ////
	@ManyToOne(() => Organization, (organization) => organization.id)
	organization: Organization;

	//// user to assigned projects relationship ////
	@ManyToMany(() => Project, (project) => project.developers)
	@JoinTable()
	assignments: Project;

	//// user to project  manager relationship ////
	@OneToMany(() => Project, (project) => project.manager)
	projects: Project[];

	//// user to ticket relationship ////
	@OneToMany(() => Ticket, (ticket) => ticket.developer)
	tickets: Ticket[];

	//// user to comment relationship ////
	@OneToMany(() => Comment, (comment) => comment.user)
	comments: Comment[];
}
