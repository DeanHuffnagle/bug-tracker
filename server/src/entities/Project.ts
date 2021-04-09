import { Field, ObjectType } from 'type-graphql';
import {
	BaseEntity,
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
export class Project extends BaseEntity {
	//================================================================================
	//Columns
	//================================================================================

	@Field()
	@PrimaryGeneratedColumn()
	id!: number;

	@Field()
	@Column()
	name!: string;

	@Field()
	@Column()
	description!: string;

	@Field(() => String)
	@CreateDateColumn()
	createdAt: Date;

	@Field(() => String)
	@UpdateDateColumn()
	updatedAt: Date;

	//================================================================================
	//Relationships
	//================================================================================

	//// Project to project manager relationship ////
	@Field(() => Number, { nullable: true })
	@ManyToOne(() => User, (user) => user.projects)
	manager: User | null;

	//// Project to assigned developers relationship ////
	@Field(() => Number, { nullable: true })
	@ManyToMany(() => User, (user) => user.assignments)
	developers: User[] | null;

	//// Project to organization relationship ////
	@Field(() => Number)
	@ManyToOne(() => Organization, (organization) => organization.projects)
	organization!: Organization;

	//// Project to tickets relationship ////
	@Field(() => Number, { nullable: true })
	@OneToMany(() => Ticket, (ticket) => ticket.project)
	tickets: Ticket[] | null;
}
