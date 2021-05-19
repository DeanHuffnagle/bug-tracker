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
import { isAuth } from '../middleware/isAuth';
import { isProjectManager } from '../middleware/isProjectManager';
import { MyContext } from '../types';
import {
	AddRepositoryLinkInput,
	AssignProjectInput,
	CreateProjectInput,
	UnassignProjectInput,
	UpdateProjectInput,
} from '../utils/inputTypes';
import { ProjectResponse, RawProjectResponse } from '../utils/objectTypes';

@Resolver(Project)
export class ProjectResolver {
	//================================================================================
	//Create Project
	//================================================================================
	@Mutation(() => ProjectResponse)
	@UseMiddleware(isProjectManager)
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
					repositoryLink: options.repositoryLink,
					organizationId: isUser.organizationId,
					managerId: isUser.id,
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
			relations: ['organization', 'assignedDevelopers', 'manager'],
		});
	}
	//================================================================================
	//Find Projects By Organization Query
	//================================================================================
	@Query(() => [Project], { nullable: true })
	async findProjectsByOrganization(
		@Ctx() { req }: MyContext
	): Promise<Project[]> {
		const isUser = await User.findOne(req.session.UserId);
		const projectsByOrganization = Project.find({
			where: { organizationId: isUser?.organizationId },
			relations: ['organization'],
		});
		// await getRepository(Project)
		// 	.createQueryBuilder('project')
		// 	.where('project.organizationId = :id', {
		// 		id: isUser?.organizationId,
		// 	})
		// 	.getMany();

		return projectsByOrganization;
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
			.where('project.id IN (:...assignedProjects)', {
				assignedProjects: isUser?.assignedProjectIds,
			})
			.getRawMany();
		return assignedProjects;
	}
	//================================================================================
	//Find Raw Managed Projects Query
	//================================================================================
	@Query(() => [RawProjectResponse], { nullable: true })
	async findRawManagedProjects(
		@Ctx() { req }: MyContext
	): Promise<RawProjectResponse[]> {
		const isUser = await User.findOne(req.session.UserId);

		const managedProjects = await getRepository(Project)
			.createQueryBuilder('project')
			.leftJoinAndSelect('project.manager', 'manager')
			.where('project.id IN (:...managedProjects)', {
				managedProjects: isUser?.managedProjectIds,
			})
			.getRawMany();
		return managedProjects;
	}
	//================================================================================
	//Find Raw Organization Projects Query
	//================================================================================
	@Query(() => [RawProjectResponse], { nullable: true })
	async findRawOrganizationProjects(
		@Ctx() { req }: MyContext
	): Promise<RawProjectResponse[]> {
		const isUser = await User.findOne(req.session.UserId);

		const organizationProjects = await getRepository(Project)
			.createQueryBuilder('project')
			.leftJoinAndSelect('project.manager', 'manager')
			.where('project.organizationId = :id ', {
				id: isUser?.organizationId,
			})
			.getRawMany();
		return organizationProjects;
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
	//================================================================================
	//Add Repository Link Mutation
	//================================================================================
	@Mutation(() => ProjectResponse)
	@UseMiddleware(isProjectManager)
	async addRepositoryLink(
		@Arg('options') options: AddRepositoryLinkInput
	): Promise<ProjectResponse> {
		const isProject = await Project.findOne(options.projectId);
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
		await Project.update(
			{ id: options.projectId },
			{ repositoryLink: options.repositoryLink }
		);

		const project = await Project.findOne(options.projectId);
		return { project };
	}
	//================================================================================
	//Update Project Mutation
	//================================================================================
	@Mutation(() => ProjectResponse)
	@UseMiddleware(isAuth)
	async updateProject(
		@Arg('options') options: UpdateProjectInput,
		@Arg('projectId', () => Int) projectId: number
	): Promise<ProjectResponse> {
		const isUser = await User.findOne({ where: { email: options.userEmail } });

		if (!options.description) {
			return {
				errors: [
					{
						field: 'projectDescription',
						message: 'cannot be blank.',
					},
				],
			};
		}
		if (!options.name) {
			return {
				errors: [
					{
						field: 'projectName',
						message: 'cannot be blank.',
					},
				],
			};
		}
		if (!isUser) {
			await getConnection()
				.createQueryBuilder()
				.update(Project)
				.set({
					name: options.name,
					description: options.description,
					repositoryLink: options.repositoryLink,
				})
				.where('id = :id', { id: projectId })
				.execute();
		}
		if (isUser) {
			await getConnection()
				.createQueryBuilder()
				.update(Project)
				.set({
					name: options.name,
					description: options.description,
					repositoryLink: options.repositoryLink,
					managerId: isUser.id,
				})
				.where('id = :id', { id: projectId })
				.execute();
		}

		const project = await Project.findOne(projectId);
		return { project };
	}
}
