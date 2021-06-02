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
import { Comment } from '../entities/Comment';
import { Ticket } from '../entities/Ticket';
import { User } from '../entities/User';
import { isAuth } from '../middleware/isAuth';
import { MyContext } from '../types';
import {
	FindCommentInput,
	FindCommentsByTicketInput,
} from '../utils/inputTypes';
import { CommentResponse, RawCommentResponse } from '../utils/objectTypes';

@Resolver(Comment)
export class CommentResolver {
	//================================================================================
	//Create Comment Mutation
	//================================================================================
	@Mutation(() => CommentResponse)
	@UseMiddleware(isAuth)
	async createComment(
		@Arg('commentText') commentText: string,
		@Arg('ticketId', () => Int) ticketId: number,
		@Ctx() { req }: MyContext
	) {
		const isUser = await User.findOne(req.session.UserId);
		const isTicket = await Ticket.findOne(ticketId);
		if (!isUser) {
			return {
				errors: [
					{
						field: 'text',
						message: 'no user is logged in.',
					},
				],
			};
		}
		if (!commentText)
			return {
				errors: [
					{
						field: 'commentText',
						message: 'comment text is blank.',
					},
				],
			};

		if (!isTicket) {
			return {
				errors: [
					{
						field: 'text',
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
				text: commentText,
				commenterId: isUser.id,
				ticketId: isTicket.id,
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
	//Delete Comment Mutation
	//================================================================================
	@Mutation(() => Int)
	async deleteComment(
		@Arg('commentId', () => Int) commentId: number
	): Promise<Number> {
		const isComment = await Comment.findOne(commentId);
		let ticketId = -1;
		if (!isComment) {
			return ticketId;
		} else {
			ticketId = isComment?.ticketId;
			await Comment.delete(commentId);
			return ticketId;
		}
	}

	//================================================================================
	//Find Comments By Ticket Query
	//================================================================================
	@Query(() => [RawCommentResponse])
	async findCommentsByTicket(
		@Arg('options') options: FindCommentsByTicketInput
	): Promise<RawCommentResponse[]> {
		const commentByTicket = await getRepository(Comment)
			.createQueryBuilder('comment')
			.leftJoinAndSelect('comment.commenter', 'commenter')
			.where('comment.ticketId = :ticketId', { ticketId: options.ticketId })
			.getRawMany();

		return commentByTicket;
	}
}
