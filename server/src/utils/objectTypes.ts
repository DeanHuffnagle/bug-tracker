import { Field, ObjectType } from 'type-graphql';
import { Comment } from '../entities/Comment';
import { Organization } from '../entities/Organization';
import { Project } from '../entities/Project';
import { Ticket } from '../entities/Ticket';
import { User } from '../entities/User';

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
export class UserResponse {
	@Field(() => [FieldError], { nullable: true })
	errors?: FieldError[];

	@Field(() => User, { nullable: true })
	user?: User;
}
