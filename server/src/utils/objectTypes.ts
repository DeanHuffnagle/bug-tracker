import { Field, Int, ObjectType } from 'type-graphql';
import { Comment } from '../entities/Comment';
import { Organization } from '../entities/Organization';
import { Project } from '../entities/Project';
import {
	Ticket,
	TicketPriorityType,
	TicketStatusType,
	TicketTypeType,
} from '../entities/Ticket';
import { User, UserRoleType } from '../entities/User';

@ObjectType()
export class FieldError {
	@Field()
	field: string;
	@Field()
	message: string;
}

@ObjectType()
export class CommentResponse {
	@Field(() => [FieldError], { nullable: true })
	errors?: FieldError[];

	@Field(() => Comment, { nullable: true })
	comment?: Comment;
}

@ObjectType()
export class OrganizationResponse {
	@Field(() => [FieldError], { nullable: true })
	errors?: FieldError[];

	@Field(() => Organization, { nullable: true })
	organization?: Organization;
}

@ObjectType()
export class ProjectResponse {
	@Field(() => [FieldError], { nullable: true })
	errors?: FieldError[];

	@Field(() => Project, { nullable: true })
	project?: Project;
}

@ObjectType()
export class TicketResponse {
	@Field(() => [FieldError], { nullable: true })
	errors?: FieldError[];

	@Field(() => Ticket, { nullable: true })
	ticket?: Ticket;
}

@ObjectType()
export class RawTicketResponse {
	@Field(() => Int)
	ticket_id: number;
	@Field()
	ticket_title: string;
	@Field()
	ticket_text: string;
	@Field()
	ticket_priority: TicketPriorityType;
	@Field()
	ticket_status: TicketStatusType;
	@Field()
	ticket_type: TicketTypeType;
	@Field(() => Int, { nullable: true })
	ticket_assignedDeveloperId?: number;
	@Field(() => Int, { nullable: true })
	ticket_creatorId?: number;
	@Field(() => Int, { nullable: true })
	ticket_projectId?: number;
	@Field(() => Int, { nullable: true })
	ticket_submitterId: number;
	@Field(() => Int)
	assignedDeveloper_id: number;
	@Field()
	assignedDeveloper_firstName: string;
	@Field()
	assignedDeveloper_lastName: string;
	@Field()
	assignedDeveloper_email: string;
	@Field()
	assignedDeveloper_role: UserRoleType;
	@Field(() => Int, { nullable: true })
	assignedDeveloper_organizationId: number;
	@Field(() => Int, { nullable: true })
	assignedDeveloper_assignedProjectsId: number;
	@Field(() => Int, { nullable: true })
	assignedDeveloper_assignedTicketsId: number;
}

@ObjectType()
export class UserResponse {
	@Field(() => [FieldError], { nullable: true })
	errors?: FieldError[];

	@Field(() => User, { nullable: true })
	user?: User;
}
