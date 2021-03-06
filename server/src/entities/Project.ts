import { Field, Int, ObjectType } from 'type-graphql';
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
	RelationId,
	UpdateDateColumn,
} from 'typeorm';
import { Organization } from './Organization';
import { Ticket } from './Ticket';
import { User } from './User';

@ObjectType()
@Entity()
export class Project extends BaseEntity {
	//================================================================================
	//Columns
	//================================================================================

	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id!: number;

	@Field()
	@Column()
	name!: string;

	@Field()
	@Column()
	description!: string;

	@Field(() => Int)
	@Column()
	organizationId!: number;

	@Field({ nullable: true })
	@Column({ nullable: true })
	repositoryLink!: string;

	@Field(() => Int, { nullable: true })
	@Column({ nullable: true })
	managerId: number | null;

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
	@Field(() => User, { nullable: true })
	@ManyToOne(() => User, (user) => user.managedProjects, {
		cascade: ['insert', 'update'],
		onDelete: 'SET NULL',
	})
	manager: User | null;

	//// Project to assigned developers relationship ////
	@Field(() => [User], { nullable: true })
	@ManyToMany(() => User, (user) => user.assignedProjects, {
		cascade: ['insert', 'update'],
		onDelete: 'CASCADE',
	})
	@JoinTable()
	assignedDevelopers: User[] | null;

	@Field(() => [Int], { nullable: true })
	@RelationId((project: Project) => project.assignedDevelopers)
	assignedDeveloperIds: number[];

	//// Project to organization relationship ////
	@Field(() => Organization)
	@ManyToOne(() => Organization, (organization) => organization.projects, {
		cascade: ['insert', 'update'],
		onDelete: 'CASCADE',
	})
	organization!: Organization;

	//// Project to tickets relationship ////
	@Field(() => [Ticket], { nullable: true })
	@OneToMany(() => Ticket, (ticket) => ticket.project, {
		cascade: ['insert', 'update'],
		onDelete: 'SET NULL',
	})
	tickets: Ticket[] | null;
}
