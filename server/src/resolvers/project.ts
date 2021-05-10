import {
	Arg,
	Ctx,
	Int,
	Mutation,
	Query,
	Resolver,
	UseMiddleware,
} from 'type-graphql';
import { getConnection, getRepository } from 'typeorm';
import { Project } from '../entities/Project';
import { User } from '../entities/User';
import { isAdmin } from '../middleware/isAdmin';
import { isProjectManager } from '../middleware/isProjectManager';
import { MyContext } from '../types';
import {
	AssignProjectInput,
	CreateProjectInput,
	UnassignProjectInput,
} from '../utils/inputTypes';
import { ProjectResponse, RawProjectResponse } from '../utils/objectTypes';

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
		return Project.findOne(id, {
			relations: ['organization', 'assignedDevelopers'],
		});
	}
	//================================================================================
	//Find Raw Assigned Projects Query
	//================================================================================
	@Query(() => [RawProjectResponse], { nullable: true })
	async findRawAssignedProjects(
		@Ctx() { req }: MyContext
	): Promise<RawProjectResponse[]> {
		const isUser = await User.findOne(req.session.UserId);

		const assignedProjects = await getRepository(Project)
			.createQueryBuilder('project')
			.leftJoinAndSelect('project.manager', 'manager')
			.leftJoinAndSelect('project.assignedDevelopers', 'assignedDevelopers')
			.where('project.id IN (:...assignedProjects)', {
				assignedProjects: isUser?.assignedProjectIds,
			})
			.getRawMany();
		return assignedProjects;
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
