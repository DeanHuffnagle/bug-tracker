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
import { isProjectManager } from '../middleware/isProjectManager';
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

@InputType()
export class AssignProjectInput {
	@Field(() => Int)
	projectId!: number;
	@Field(() => Int)
	userId!: number;
}

@InputType()
export class UnassignProjectInput {
	@Field(() => Int)
	projectId!: number;
	@Field(() => Int)
	userId!: number;
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
		return Project.findOne(id, { relations: ['organization'] });
	}
	//================================================================================
	//Assign Project Mutation
	//================================================================================
	@Mutation(() => ProjectResponse)
	@UseMiddleware(isProjectManager)
	async assignProject(@Arg('options') options: AssignProjectInput) {
		const isProject = await Project.findOne(options.projectId);
		const isUser = await User.findOne(options.userId);
		if (!isUser) {
			return {
				errors: [
					{
						field: 'user',
						message: 'no user found.',
					},
				],
			};
		}
		if (!isProject) {
			return {
				errors: [
					{
						field: 'project',
						message: 'no project found.',
					},
				],
			};
		}
		await getConnection()
			.createQueryBuilder()
			.relation(Project, 'assignedDevelopers')
			.of(isProject)
			.add(isUser);
		const project = await Project.findOne(options.projectId, {
			relations: ['assignedDevelopers'],
		});

		return { project };
	}
	//================================================================================
	//Unassign Project Mutation
	//================================================================================
	@Mutation(() => ProjectResponse)
	@UseMiddleware(isProjectManager)
	async unassignProject(
		@Arg('options') options: UnassignProjectInput
	): Promise<ProjectResponse> {
		const isProject = await Project.findOne(options.projectId);
		const isUser = await User.findOne(options.userId);
		if (!isUser) {
			return {
				errors: [
					{
						field: 'user',
						message: 'no user found.',
					},
				],
			};
		}
		if (!isProject) {
			return {
				errors: [
					{
						field: 'project',
						message: 'no project found.',
					},
				],
			};
		}
		await getConnection()
			.createQueryBuilder()
			.relation(Project, 'assignedDevelopers')
			.of(isProject)
			.remove(isUser);

		const project = await Project.findOne(options.projectId, {
			relations: ['assignedDevelopers'],
		});
		return { project };
	}
	//================================================================================
	//Assign Project Manager
	//================================================================================
	@Mutation(() => ProjectResponse)
	@UseMiddleware(isAdmin)
	async assignProjectManager(@Arg('options') options: AssignProjectInput) {
		const isProject = await Project.findOne(options.projectId);
		const isUser = await User.findOne(options.userId);
		if (!isUser) {
			return {
				errors: [
					{
						field: 'user',
						message: 'no user found.',
					},
				],
			};
		}
		if (!isProject) {
			return {
				errors: [
					{
						field: 'project',
						message: 'no project found.',
					},
				],
			};
		}
		await getConnection()
			.createQueryBuilder()
			.relation(Project, 'manager')
			.of(isProject)
			.set(isUser);
		const project = await Project.findOne(options.projectId, {
			relations: ['manager'],
		});

		return { project };
	}
	//================================================================================
	//Unassign Project Manager
	//================================================================================
	@Mutation(() => ProjectResponse)
	@UseMiddleware(isProjectManager)
	async unassignProjectManager(
		@Arg('options') options: UnassignProjectInput
	): Promise<ProjectResponse> {
		const isProject = await Project.findOne(options.projectId);
		const isUser = await User.findOne(options.userId);
		if (!isUser) {
			return {
				errors: [
					{
						field: 'user',
						message: 'no user found.',
					},
				],
			};
		}
		if (!isProject) {
			return {
				errors: [
					{
						field: 'project',
						message: 'no project found.',
					},
				],
			};
		}
		await getConnection()
			.createQueryBuilder()
			.relation(Project, 'assignedDevelopers')
			.of(isProject)
			.set(null);

		const project = await Project.findOne(options.projectId, {
			relations: ['manager'],
		});
		return { project };
	}
}
