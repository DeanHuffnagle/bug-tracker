import {
	Arg,
	Ctx,
	Mutation,
	Query,
	Resolver,
	UseMiddleware,
} from 'type-graphql';
import { getConnection, getRepository } from 'typeorm';
import { Comment } from '../entities/Comment';
import { Ticket } from '../entities/Ticket';
import { User } from '../entities/User';
import { isAuth } from '../middleware/isAuth';
import { MyContext } from '../types';
import {
	CreateCommentInput,
	FindCommentInput,
	FindCommentsByTicketInput,
} from '../utils/inputTypes';
import { CommentResponse } from '../utils/objectTypes';

@Resolver(Comment)
export class CommentResolver {
	//================================================================================
	//Create Comment Mutation
	//================================================================================
	@Mutation(() => CommentResponse)
	@UseMiddleware(isAuth)
	async createComment(
		@Arg('options') options: CreateCommentInput,
		@Ctx() { req }: MyContext
	) {
		const isUser = await User.findOne(req.session.UserId);
		const isTicket = await Ticket.findOne(options.ticketId);
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

		if (!isTicket) {
			return {
				errors: [
					{
						field: 'ticket',
						message: 'no ticket found.',
					},
				],
			};
		}
		let comment;
		const result = await getConnection()
			.createQueryBuilder()
			.insert()
			.into(Comment)
			.values({
				text: options.commentText,
				commenterId: isUser.id,
				ticketId: options.ticketId,
			})
			.returning('*')
			.execute();

		comment = result.raw[0];

		return { comment };
	}
	//================================================================================
	//Find Comment
	//================================================================================
	@Query(() => CommentResponse)
	async findComment(
		@Arg('options') options: FindCommentInput
	): Promise<CommentResponse> {
		const comment = await Comment.findOne(options.commentId, {
			relations: ['commenter', 'ticket'],
		});
		if (!Comment) {
			return {
				errors: [
					{
						field: 'comment',
						message: 'no comment found.',
					},
				],
			};
		}
		return { comment };
	}
	//================================================================================
	//Find Comments Query
	//================================================================================
	@Query(() => [Comment])
	async findComments(): Promise<Comment[]> {
		return Comment.find();
	}
	//================================================================================
	//Find Comments By Ticket Query
	//================================================================================
	@Query(() => [Comment])
	async findCommentsByTicket(
		@Arg('options') options: FindCommentsByTicketInput
	): Promise<Comment[]> {
		const commentByTicket = await getRepository(Comment)
			.createQueryBuilder('comment')
			.leftJoinAndSelect('comment.commenter', 'commenter')
			.where('comment.ticketId = :ticketId', { ticketId: options.ticketId })
			.getMany();

		return commentByTicket;
	}
}
