import { cacheExchange } from '@urql/exchange-graphcache';
import { inspectFields } from '@urql/exchange-graphcache/dist/types/store/data';
import { dedupExchange, fetchExchange } from 'urql';
import {
	FindUsersByJoinRequestQueryVariables,
	LoginMutation,
	LogoutMutation,
	MeDocument,
	MeQuery,
	RegisterMutation,
} from '../generated/graphql';
import { betterUpdateQuery } from './betterUpdateQuery';

export const createUrqlClient = (ssrExchange: any) => {
	return {
		url: process.env.NEXT_PUBLIC_API_URL as string,
		fetchOptions: {
			credentials: 'include' as const,
		},
		exchanges: [
			dedupExchange,
			cacheExchange({
				keys: {
					RawCommentResponse: () => null,
					RawTicketResponse: () => null,
					RawProjectResponse: () => null,
				},
				updates: {
					Mutation: {
						acceptJoinRequest: (result, args, cache, info) => {
							// console.log(cache.inspectFields('Query'));
							cache.invalidate('Query', 'findUsersByJoinRequest', {
								options: {
									organizationId: (args as FindUsersByJoinRequestQueryVariables)
										.options?.organizationId,
								},
							});
							// console.log(cache.inspectFields('Query'));
						},

						declineJoinRequest: (result, args, cache, info) => {
							// console.log(cache.inspectFields('Query'));
							cache.invalidate('Query', 'findUsersByJoinRequest', {
								options: {
									organizationId: (args as FindUsersByJoinRequestQueryVariables)
										.options.organizationId,
								},
							});
							// console.log(cache.inspectFields('Query'));
						},

						changeUserRole: (result, args, cache, info) => {
							console.log('change role update starting: ');
							console.log(cache.inspectFields('Query'));
							cache.invalidate('Query', 'findRawOrganizationUsers');
							console.log(cache.inspectFields('Query'));
						},

						updateProject: (result, args, cache, info) => {
							// console.log(cache.inspectFields('Query'));
							cache.invalidate('Query', 'findProject', {
								id: args.projectId,
							});
							// console.log(cache.inspectFields('Query'));
						},

						updateTicket: (result, args, cache, info) => {
							// console.log(cache.inspectFields('Query'));
							cache.invalidate('Query', 'findTicket', {
								id: args.ticketId,
							});
							// console.log(cache.inspectFields('Query'));
						},

						createComment: (result, _args, cache) => {
							cache.invalidate('Query', 'findCommentsByTicket', {
								options: {
									ticketId: _args.ticketId,
								},
							});
						},

						deleteComment: (result, _args, cache) => {
							if (result.deleteComment !== -1) {
								cache.invalidate('Query', 'findCommentsByTicket', {
									options: {
										ticketId: result.deleteComment,
									},
								});
							}
						},

						login: (_result, args, cache, info) => {
							betterUpdateQuery<LoginMutation, MeQuery>(
								cache,
								{ query: MeDocument },
								_result,
								(result, query) => {
									if (result.login.errors) {
										return query;
									} else {
										return {
											me: result.login.user,
										};
									}
								}
							);
						},

						register: (_result, args, cache, info) => {
							betterUpdateQuery<RegisterMutation, MeQuery>(
								cache,
								{ query: MeDocument },
								_result,
								(result, query) => {
									if (result.register.errors) {
										return query;
									} else {
										return {
											me: result.register.user,
										};
									}
								}
							);
						},

						logout: (_result, args, cache, info) => {
							betterUpdateQuery<LogoutMutation, MeQuery>(
								cache,
								{ query: MeDocument },
								_result,
								(result, query) => ({ me: null })
							);
						},
					},
				},
			}),
			ssrExchange,
			fetchExchange,
		],
	};
};
