import { ApolloServer } from 'apollo-server-express';
import connectRedis from 'connect-redis';
import express from 'express';
import session from 'express-session';
import redis from 'redis';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { COOKIE_NAME, __prod__ } from './constants';
import { Comment } from './entities/Comment';
import { Organization } from './entities/Organization';
import { Project } from './entities/Project';
import { Ticket } from './entities/Ticket';
import { User } from './entities/User';
import { OrganizationResolver } from './resolvers/organization';
import { ProjectResolver } from './resolvers/Project';
import { UserResolver } from './resolvers/user';

const main = async () => {
	await createConnection({
		type: 'postgres',
		username: 'postgres',
		password: 'postgres',
		database: 'BugTracker',
		entities: [User, Ticket, Project, Organization, Comment],
		synchronize: true,
		logging: true,
	});

	const app = express();

	``;
	const RedisStore = connectRedis(session);
	const redisClient = redis.createClient();

	app.use(
		session({
			name: COOKIE_NAME,
			store: new RedisStore({
				client: redisClient,
				disableTouch: true,
			}),
			cookie: {
				maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
				httpOnly: true,
				sameSite: 'lax',
				secure: __prod__,
			},
			saveUninitialized: false,
			secret: 'Sigj24Ih00Gk0@uo&OygUyg#hfSfT4Ykmnv66$4gjO9',
			resave: false,
		})
	);

	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [UserResolver, OrganizationResolver, ProjectResolver],
			validate: false,
		}),
		context: ({ req, res }) => ({
			req,
			res,
		}),
	});

	//creates the graphql endpoint on localhost
	apolloServer.applyMiddleware({ app });

	app.listen(4000, () => {
		console.log('server started on localhost:4000');
	});
};

main().catch((err) => {
	console.error(err);
});
