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
import { Ticket } from '../entities/Ticket';
import { User } from '../entities/User';
import { isAuth } from '../middleware/isAuth';
import { isProjectManager } from '../middleware/isProjectManager';
import { isSubmitter } from '../middleware/isSubmitter';
import { MyContext } from '../types';
import {
	AssignTicketInput,
	AssignTicketManagerInput,
	ChangeTicketPriorityInput,
	ChangeTicketStatusInput,
	ChangeTicketTypeInput,
	CreateTicketInput,
	FindAssignedTicketsByPriorityInput,
	FindAssignedTicketsByStatusInput,
	FindAssignedTicketsByTypeInput,
	UpdateTicketInput,
} from '../utils/inputTypes';
import { RawTicketResponse, TicketResponse } from '../utils/objectTypes';

@Resolver(Ticket)
export class TicketResolver {
	//================================================================================
	//Create Ticket
	//================================================================================
	@Mutation(() => TicketResponse)
	@UseMiddleware(isSubmitter)
	async createTicket(
		@Arg('options') options: CreateTicketInput,
		@Ctx() { req }: MyContext
	): Promise<TicketResponse> {
		const isUser = await User.findOne(req.session.UserId, {
			relations: ['assignedProjects', 'managedProjects'],
		});
		const isProject = await Project.findOne(options.projectId);
		if (!isProject) {
			return {
				errors: [
					{
						field: 'project',
						message: 'failed to find a project with that id.',
					},
				],
			};
		}

		let ticket;
		try {
			const result = await getConnection()
				.createQueryBuilder()
				.insert()
				.into(Ticket)
				.values({
					title: options.title,
					text: options.text,
					submitterId: isUser?.id,
					managerId: isProject.managerId,
					projectId: isProject?.id,
					organizationId: isUser?.organizationId,
					assignedDeveloperId: isUser?.id,
				})
				.returning('*')
				.execute();

			ticket = result.raw[0];
		} catch (err) {
			console.error(err);
		}
		return { ticket };
	}
	//================================================================================
	//Assign Ticket Mutation
	//================================================================================
	@Mutation(() => TicketResponse)
	@UseMiddleware(isProjectManager)
	async assignTicket(@Arg('options') options: AssignTicketInput) {
		const isTicket = await Ticket.findOne(options.ticketId);
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
		if (!isTicket) {
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
			.relation(Ticket, 'assignedDeveloper')
			.of(isTicket)
			.set(isUser);
		const ticket = await Ticket.findOne(options.ticketId, {
			relations: ['assignedDeveloper'],
		});
		return { ticket };
	}
	//================================================================================
	//Assign Ticket Manager Mutation
	//================================================================================
	@Mutation(() => TicketResponse)
	@UseMiddleware(isProjectManager)
	async assignTicketManager(@Arg('options') options: AssignTicketManagerInput) {
		const isTicket = await Ticket.findOne(options.ticketId);
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
		if (!isTicket) {
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
			.relation(Ticket, 'manager')
			.of(isTicket)
			.set(isUser);
		const ticket = await Ticket.findOne(options.ticketId, {
			relations: ['manager'],
		});
		return { ticket };
	}
	//================================================================================
	//Update Ticket Mutation
	//================================================================================
	@Mutation(() => TicketResponse)
	@UseMiddleware(isAuth)
	async updateTicket(
		@Arg('options') options: UpdateTicketInput,
		@Arg('ticketId', () => Int) ticketId: number
	): Promise<TicketResponse> {
		const isUser = await User.findOne({ where: { email: options.userEmail } });
		if (!options.ticketText) {
			return {
				errors: [
					{
						field: 'ticketText',
						message: 'cannot be blank.',
					},
				],
			};
		}
		if (!options.ticketTitle) {
			return {
				errors: [
					{
						field: 'ticketTitle',
						message: 'cannot be blank.',
					},
				],
			};
		}
		if (!isUser) {
			await await getConnection()
				.createQueryBuilder()
				.update(Ticket)
				.set({
					title: options.ticketTitle,
					text: options.ticketText,
					status: options.ticketStatus,
					type: options.ticketType,
					priority: options.ticketPriority,
				})
				.where('id = :id', { id: ticketId })
				.execute();
		}
		if (isUser) {
			await await getConnection()
				.createQueryBuilder()
				.update(Ticket)
				.set({
					title: options.ticketTitle,
					text: options.ticketText,
					status: options.ticketStatus,
					type: options.ticketType,
					priority: options.ticketPriority,
					assignedDeveloperId: isUser.id,
				})
				.where('id = :id', { id: ticketId })
				.execute();
		}

		const ticket = await Ticket.findOne(ticketId);
		return { ticket };
	}
	//================================================================================
	//Change Ticket Status
	//================================================================================
	@Mutation(() => TicketResponse)
	async changeTicketStatus(
		@Arg('options') options: ChangeTicketStatusInput,
		@Ctx() { req }: MyContext
	): Promise<TicketResponse> {
		// const isTicket = await Ticket.findOne(options.ticketId);
		const isUser = await User.findOne(req.session.UserId);
		if (!isUser) {
			return {
				errors: [
					{
						field: 'user',
						message: 'no user is logged in.',
					},
				],
			};
		}
		await Ticket.update({ id: options.ticketId }, { status: options.status });
		const ticket = await Ticket.findOne(options.ticketId);
		return { ticket };
	}
	//================================================================================
	//Change Ticket Priority
	//================================================================================
	@Mutation(() => TicketResponse)
	async changeTicketPriority(
		@Arg('options') options: ChangeTicketPriorityInput,
		@Ctx() { req }: MyContext
	): Promise<TicketResponse> {
		// const isTicket = await Ticket.findOne(options.ticketId);
		const isUser = await User.findOne(req.session.UserId);
		if (!isUser) {
			return {
				errors: [
					{
						field: 'user',
						message: 'no user is logged in.',
					},
				],
			};
		}
		await Ticket.update(
			{ id: options.ticketId },
			{ priority: options.priority }
		);
		const ticket = await Ticket.findOne(options.ticketId);
		return { ticket };
	}
	//================================================================================
	//Change Ticket Type
	//================================================================================
	@Mutation(() => TicketResponse)
	async changeTicketType(
		@Arg('options') options: ChangeTicketTypeInput,
		@Ctx() { req }: MyContext
	): Promise<TicketResponse> {
		// const isTicket = await Ticket.findOne(options.ticketId);
		const isUser = await User.findOne(req.session.UserId);
		if (!isUser) {
			return {
				errors: [
					{
						field: 'user',
						message: 'no user is logged in.',
					},
				],
			};
		}
		await Ticket.update({ id: options.ticketId }, { type: options.type });
		const ticket = await Ticket.findOne(options.ticketId);
		return { ticket };
	}
	//================================================================================
	//Find Ticket Query
	//================================================================================
	@Query(() => Ticket, { nullable: true })
	findTicket(@Arg('id', () => Int) id: number): Promise<Ticket | undefined> {
		return Ticket.findOne(id, { relations: ['assignedDeveloper', 'project'] });
	}
	//================================================================================
	//Find Tickets Query
	//================================================================================
	@Query(() => [Ticket])
	async findTickets(): Promise<Ticket[]> {
		return Ticket.find({ relations: ['assignedDeveloper', 'submitter'] });
	}
	//================================================================================
	//Find Assigned Tickets Query
	//================================================================================
	@Query(() => [Ticket], { nullable: true })
	async findAssignedTickets(@Ctx() { req }: MyContext): Promise<Ticket[]> {
		const isUser = await User.findOne(req.session.UserId);
		const assignedTickets = await getRepository(Ticket)
			.createQueryBuilder('ticket')
			.leftJoinAndSelect('ticket.assignedDeveloper', 'assignedDeveloper')
			.where('ticket.assignedDeveloperId = :id', { id: isUser?.id })
			.getMany();

		console.log('data: ', JSON.stringify(assignedTickets));
		return assignedTickets;
	}
	//================================================================================
	//Find Raw Assigned Tickets Query
	//================================================================================
	@Query(() => [RawTicketResponse], { nullable: true })
	async findRawAssignedTickets(
		@Ctx() { req }: MyContext
	): Promise<RawTicketResponse[]> {
		const isUser = await User.findOne(req.session.UserId);
		const assignedTickets = await getRepository(Ticket)
			.createQueryBuilder('ticket')
			.leftJoinAndSelect('ticket.manager', 'manager')
			.leftJoinAndSelect('ticket.submitter', 'submitter')
			.leftJoinAndSelect('ticket.assignedDeveloper', 'assignedDeveloper')
			.where('ticket.assignedDeveloperId = :id', { id: isUser?.id })
			.getRawMany();
		return assignedTickets;
	}
	//================================================================================
	//Find Raw Organization Tickets Query
	//================================================================================
	@Query(() => [RawTicketResponse], { nullable: true })
	async findRawOrganizationTickets(
		@Ctx() { req }: MyContext
	): Promise<RawTicketResponse[]> {
		const isUser = await User.findOne(req.session.UserId);
		const organizationTickets = await getRepository(Ticket)
			.createQueryBuilder('ticket')
			.leftJoinAndSelect('ticket.manager', 'manager')
			.leftJoinAndSelect('ticket.submitter', 'submitter')
			.leftJoinAndSelect('ticket.assignedDeveloper', 'assignedDeveloper')
			.where('ticket.organizationId = :id', { id: isUser?.organizationId })
			.getRawMany();
		console.log('data: ', organizationTickets);
		return organizationTickets;
	}
	//================================================================================
	//Find Raw Tickets By Project Query
	//================================================================================
	@Query(() => [RawTicketResponse], { nullable: true })
	async findRawTicketsByProject(
		@Arg('projectId', () => Int) projectId: number
	): Promise<RawTicketResponse[]> {
		const projectTickets = await getRepository(Ticket)
			.createQueryBuilder('ticket')
			.leftJoinAndSelect('ticket.manager', 'manager')
			.leftJoinAndSelect('ticket.submitter', 'submitter')
			.leftJoinAndSelect('ticket.assignedDeveloper', 'assignedDeveloper')
			.where('ticket.projectId = :id', { id: projectId })
			.getRawMany();
		console.log('data: ', projectTickets);
		return projectTickets;
	}
	//================================================================================
	//Find Raw Managed Tickets Query
	//================================================================================
	@Query(() => [RawTicketResponse], { nullable: true })
	@UseMiddleware(isProjectManager)
	async findRawManagedTickets(
		@Ctx() { req }: MyContext
	): Promise<RawTicketResponse[] | null> {
		const isUser = await User.findOne(req.session.UserId, {
			relations: ['managedProjects'],
		});
		if (!isUser?.managedProjects) {
			return null;
		}
		const managedTickets = await getRepository(Ticket)
			.createQueryBuilder('ticket')
			.leftJoinAndSelect('ticket.manager', 'manager')
			.leftJoinAndSelect('ticket.submitter', 'submitter')
			.leftJoinAndSelect('ticket.assignedDeveloper', 'assignedDeveloper')
			.where('ticket.managerId = :id', { id: isUser?.id })
			.getRawMany();

		console.log('data: ', managedTickets);
		return managedTickets;
	}
	//================================================================================
	//Find Assigned Tickets By Priority Query
	//================================================================================
	@Query(() => [Ticket], { nullable: true })
	async findAssignedTicketsByPriority(
		@Arg('options') options: FindAssignedTicketsByPriorityInput,
		@Ctx() { req }: MyContext
	): Promise<Ticket[]> {
		const isUser = await User.findOne(req.session.UserId);
		const ticketsByPriority = await getRepository(Ticket)
			.createQueryBuilder('ticket')
			.leftJoinAndSelect('ticket.assignedDeveloper', 'assignedDeveloper')
			.where('ticket.priority = :priority', { priority: options.priority })
			.andWhere('ticket.assignedDeveloperId = :id', { id: isUser?.id })
			.getMany();
		return ticketsByPriority;
	}
	//================================================================================
	//Find Assigned Tickets By Status Query
	//================================================================================
	@Query(() => [Ticket], { nullable: true })
	async findAssignedTicketsByStatus(
		@Arg('options') options: FindAssignedTicketsByStatusInput,
		@Ctx() { req }: MyContext
	): Promise<Ticket[]> {
		const isUser = await User.findOne(req.session.UserId);
		const ticketsByStatus = await getConnection()
			.createQueryBuilder()
			.select('ticket')
			.from(Ticket, 'ticket')
			.where('ticket.status = :status', { status: options.status })
			.andWhere('ticket.assignedDeveloperId = :id', { id: isUser?.id })
			.getMany();
		return ticketsByStatus;
	}
	//================================================================================
	//Find Assigned Tickets By Type Query
	//================================================================================
	@Query(() => [Ticket], { nullable: true })
	async findAssignedTicketsByType(
		@Arg('options') options: FindAssignedTicketsByTypeInput,
		@Ctx() { req }: MyContext
	): Promise<Ticket[]> {
		const isUser = await User.findOne(req.session.UserId);
		const ticketsByType = await getConnection()
			.createQueryBuilder()
			.select('ticket')
			.from(Ticket, 'ticket')
			.where('ticket.type = :type', { type: options.type })
			.andWhere('ticket.assignedDeveloperId = :id', { id: isUser?.id })
			.getMany();
		return ticketsByType;
	}
}
