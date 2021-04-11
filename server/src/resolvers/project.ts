import {
	Arg,
	Ctx,
	Field,
	InputType,
	Int,
	Mutation,
	ObjectType,
	Query,
	Resolver,
	UseMiddleware,
} from 'type-graphql';
import { getConnection } from 'typeorm';
import { Project } from '../entities/Project';
import { User } from '../entities/User';
import { isAdmin } from '../middleware/isAdmin';
import { MyContext } from '../types';

@ObjectType()
class ProjectFieldError {
	@Field()
	field: string;
	@Field()
	message: string;
}

@ObjectType()
class ProjectResponse {
	@Field(() => [ProjectFieldError], { nullable: true })
	errors?: ProjectFieldError[];

	@Field(() => Project, { nullable: true })
	project?: Project;
}
//================================================================================
//Inputs
//================================================================================
//// Create Project ////
@InputType()
export class CreateProjectInput {
	@Field()
	name!: string;
	@Field()
	description!: string;
}

//// CR ////
@Resolver(Project)
export class ProjectResolver {
	//================================================================================
	//Create Project
	//================================================================================
	@Mutation(() => ProjectResponse)
	@UseMiddleware(isAdmin)
	async createProject(
		@Arg('options') options: CreateProjectInput,
		@Ctx() { req }: MyContext
	): Promise<ProjectResponse> {
		const isUser = await User.findOne(req.session.UserId);
		console.log('user: ', isUser);
		console.log('options: ', options);
		let project;
		if (!isUser?.organizationId) {
			return {
				errors: [
					{
						field: 'user',
						message: 'user not in an organization.',
					},
				],
			};
		}
		try {
			const result = await getConnection()
				.createQueryBuilder()
				.insert()
				.into(Project)
				.values({
					name: options.name,
					description: options.description,
					organizationId: isUser.organizationId,
				})
				.returning('*')
				.execute();

			project = result.raw[0];
		} catch (err) {
			console.log('err: ', err);
		}
		return { project };
	}
	//================================================================================
	//Find Project Query
	//================================================================================
	@Query(() => Project, { nullable: true })
	findProject(@Arg('id', () => Int) id: number): Promise<Project | undefined> {
		return Project.findOne(id);
	}
}
