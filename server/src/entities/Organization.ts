import { Field, ObjectType } from 'type-graphql';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Project } from './Project';
import { User } from './User';

@ObjectType()
@Entity()
export class Organization {
	//================================================================================
	//Columns
	//================================================================================

	@Field()
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column()
	name: string;

	//================================================================================
	//Relationships
	//================================================================================

	//// Organization to user relationship ////
	@Field(() => Number)
	@OneToMany(() => User, (user) => user.organization)
	user: User[];

	//// Organization to projects relationship ////
	@Field(() => Number)
	@OneToMany(() => Project, (project) => project.organization)
	projects: Project[];
}
