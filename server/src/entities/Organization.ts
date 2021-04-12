import { Field, Int, ObjectType } from 'type-graphql';
import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	OneToMany,
	BaseEntity,
	OneToOne,
	JoinColumn,
} from 'typeorm';
import { Project } from './Project';
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
	@OneToOne(() => User, (user) => user.createdOrganization, {
		cascade: ['insert', 'update'],
		onDelete: 'CASCADE',
	})
	@JoinColumn()
	creator!: User;

	//// Organization to projects relationship ////
	@Field(() => Number, { nullable: true })
	@OneToMany(() => Project, (project) => project.organization, {
		cascade: ['insert', 'update'],
		onDelete: 'SET NULL',
	})
	projects: Project[] | null;
}
