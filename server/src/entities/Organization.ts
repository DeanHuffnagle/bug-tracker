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

	@Field(() => Int)
	@Column()
	creatorId!: number;
	//================================================================================
	//Relationships
	//================================================================================

	//// Organization to user relationship ////
	@Field(() => [User], { nullable: true })
	@OneToMany(() => User, (user) => user.organization)
	user: User[];

	//// organization to creator relationship ////
	@OneToOne(() => User, (user) => user.createdOrganization, {
		onDelete: 'CASCADE',
	})
	@JoinColumn()
	creator: User;

	//// Organization to projects relationship ////
	@Field(() => Number, { nullable: true })
	@OneToMany(() => Project, (project) => project.organization)
	projects: Project[] | null;
}
