import { Field, ObjectType } from 'type-graphql';
import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToMany,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { Organization } from './Organization';
import { Ticket } from './Ticket';
import { User } from './User';

ObjectType();
@Entity()
export class Project {
	//================================================================================
	//Columns
	//================================================================================

	@Field()
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column()
	name: string;

	@Field()
	@Column()
	description: string;

	@Field()
	@CreateDateColumn()
	createdAt: Date;

	@Field()
	@UpdateDateColumn()
	updatedAt: Date;

	//================================================================================
	//Relationships
	//================================================================================

	//// Project to project manager relationship ////
	@Field()
	@ManyToOne(() => User, (user) => user.projects)
	manager: User;

	//// Project to assigned developers relationship ////
	@Field()
	@ManyToMany(() => User, (user) => user.assignments)
	developers: User[];

	//// Project to organization relationship ////
	@Field()
	@ManyToOne(() => Organization, (organization) => organization.projects)
	organization: Organization;

	//// Project to tickets relationship ////
	@Field()
	@OneToMany(() => Ticket, (ticket) => ticket.project)
	tickets: Ticket[];
}
