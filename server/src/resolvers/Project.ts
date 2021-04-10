import {
	Arg,
	Ctx,
	Field,
	InputType,
	Mutation,
	ObjectType,
	Resolver,
} from 'type-graphql';
import { getConnection } from 'typeorm';
import { Project } from '../entities/Project';
import { User } from '../entities/User';
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

@InputType()
export class CreateProjectInput {
	@Field()
	name!: string;
	@Field()
	description!: string;
}

@Resolver(Project)
export class ProjectResolver {
	//================================================================================
	//Create Project
	//================================================================================
	@Mutation(() => ProjectResponse)
	async createProject(
		@Arg('options') options: CreateProjectInput,
		@Ctx() { req }: MyContext
	): Promise<ProjectResponse> {
		const creator = await User.findOne(req.session.UserId);
		console.log('user: ', creator);
		console.log('options: ', options);
		let project;
		try {
			const result = await getConnection()
				.createQueryBuilder()
				.insert()
				.into(Project)
				.values({
					name: options.name,
					description: options.description,
				})
				.returning('*')
				.execute();

			project = result.raw[0];
		} catch (err) {
			console.log('err: ', err);
		}
		return { project };
	}
}
