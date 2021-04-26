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
import { isProjectManager } from '../middleware/isProjectManager';
import { isSubmitter } from '../middleware/isSubmitter';
import { MyContext } from '../types';
import {
	AssignTicketInput,
	ChangeTicketPriorityInput,
	ChangeTicketStatusInput,
	ChangeTicketTypeInput,
	CreateTicketInput,
	FindAssignedTicketsByPriorityInput,
	FindAssignedTicketsByStatusInput,
	FindAssignedTicketsByTypeInput,
} from '../utils/inputTypes';
import { TicketResponse } from '../utils/objectTypes';

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
		const isUser = await User.findOne(req.session.UserId);
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
		if (isUser?.role === 'submitter') {
			if (isUser.assignedProjectsId !== isProject?.id) {
				return {
					errors: [
						{
							field: 'user',
							message: 'this user is not assigned to this project.',
						},
					],
				};
			}
		}
		if (isUser?.role === 'projectManager') {
			if (isUser.assignedProjectsId !== isProject?.id) {
				return {
					errors: [
						{
							field: 'user',
							message: 'this user is not assigned to this project.',
						},
					],
				};
			}
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
					creatorId: req.session.UserId,
					projectId: isProject?.id,
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
		return assignedTickets;
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
