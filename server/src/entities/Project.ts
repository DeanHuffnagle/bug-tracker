import {
	Column,
	Entity,
	ManyToMany,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Organization } from './Organization';
import { Ticket } from './Ticket';
import { User } from './User';

@Entity()
export class Project {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	//// Project to project manager relationship ////
	@ManyToOne(() => User, (user) => user.id)
	manager: User;

	//// Project to assigned developers relationship ////
	@ManyToMany(() => User, (user) => user.assignments)
	developers: User[];

	//// Project to organization relationship ////
	@ManyToOne(() => Organization, (organization) => organization.id)
	organization: Organization;

	//// Project to tickets relationship ////
	@OneToMany(() => Ticket, (ticket) => ticket.project)
	tickets: Ticket[];
}
