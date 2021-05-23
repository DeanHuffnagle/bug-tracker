import { Field, Int, ObjectType } from 'type-graphql';
import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	OneToMany,
	BaseEntity,
	OneToOne,
	JoinColumn,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';
import { Project } from './Project';
import { Ticket } from './Ticket';
import { User } from './User';

@ObjectType()
@Entity()
export class Organization extends BaseEntity {
	//================================================================================
	//Columns
	//================================================================================

	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id!: number;

	@Field()
	@Column()
	name!: string;

	@Field(() => Int, { nullable: true })
	@Column({ nullable: true })
	creatorId: number;

	@Field(() => String, { nullable: true })
	@Column({ nullable: true })
	link: string;

	@Field(() => String)
	@CreateDateColumn()
	createdAt: Date;

	@Field(() => String)
	@UpdateDateColumn()
	updatedAt: Date;

	//================================================================================
	//Relationships
	//================================================================================

	//// Organization to user relationship ////
	@Field(() => [User], { nullable: true })
	@OneToMany(() => User, (user) => user.organization, {
		cascade: ['insert', 'update'],
		onDelete: 'SET NULL',
	})
	users: User[];

	//// organization to creator relationship ////
	@Field(() => User)
	@OneToOne(() => User, (user) => user.createdOrganization, {
		cascade: ['insert', 'update'],
		onDelete: 'CASCADE',
	})
	@JoinColumn()
	creator!: User;

	//// Organization to projects relationship ////
	@Field(() => [Project], { nullable: true })
	@OneToMany(() => Project, (project) => project.organization, {
		cascade: ['insert', 'update'],
		onDelete: 'SET NULL',
	})
	projects: Project[] | null;

	//// Organization to tickets relationship ////
	@Field(() => [Ticket], { nullable: true })
	@OneToMany(() => Ticket, (ticket) => ticket.organization, {
		cascade: ['insert', 'update'],
		onDelete: 'SET NULL',
	})
	tickets: Ticket[] | null;
}
