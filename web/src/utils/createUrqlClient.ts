import { cacheExchange, Cache } from '@urql/exchange-graphcache';
import { dedupExchange, fetchExchange } from 'urql';
import {
	CreateCommentMutation,
	FindCommentsByTicketDocument,
	FindCommentsByTicketQuery,
	LoginMutation,
	LogoutMutation,
	MeDocument,
	MeQuery,
	RegisterMutation,
} from '../generated/graphql';
import { betterUpdateQuery } from './betterUpdateQuery';

// function invalidateAllComments(cache: Cache) {
// 	console.log('before: ', cache.inspectFields('Query'));
// 	const allFields = cache.inspectFields('Query');
// 	const fieldInfos = allFields.filter((info) => info.fieldName === 'comments');
// 	fieldInfos.forEach((fi) => {
// 		cache.invalidate('Query', 'findCommentsByTicket', fi.arguments || {});
// 	});
// 	console.log('after: ', cache.inspectFields('Query'));
// }

export const createUrqlClient = (ssrExchange: any) => {
	return {
		url: 'http://localhost:4000/graphql',
		fetchOptions: {
			credentials: 'include' as const,
		},
		exchanges: [
			dedupExchange,
			cacheExchange({
				updates: {
					Mutation: {
						createComment: (result, _args, cache) => {
							console.log(cache.inspectFields('Query'));
							cache.invalidate('Query', 'findCommentsByTicket', {
								options: {
									ticketId: _args.ticketId,
								},
							});
							console.log(cache.inspectFields('Query'));
						},

						login: (_result, args, cache, info) => {
							console.log('login: ');
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
