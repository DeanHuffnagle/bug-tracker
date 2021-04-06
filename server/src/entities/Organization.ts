import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Project } from './Project';
import { User } from './User';

@Entity()
export class Organization {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@OneToMany(() => User, (user) => user.organization)
	user: User[];

	@OneToMany(() => Project, (project) => project.organization)
	projects: Project[];
}
