import { ApolloServer } from 'apollo-server-express';
import 'dotenv-safe/config';
import connectRedis from 'connect-redis';
import express from 'express';
import session from 'express-session';
import Redis from 'ioredis';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { COOKIE_NAME, __prod__ } from './constants';
import { Comment } from './entities/Comment';
import { Organization } from './entities/Organization';
import { Project } from './entities/Project';
import { Ticket } from './entities/Ticket';
import { User } from './entities/User';
import { CommentResolver } from './resolvers/comment';
import { OrganizationResolver } from './resolvers/organization';
import { ProjectResolver } from './resolvers/project';
import { TicketResolver } from './resolvers/ticket';
import { UserResolver } from './resolvers/user';
import cors from 'cors';
import path from 'path';

const main = async () => {
	const conn = await createConnection({
		type: 'postgres',
		url: process.env.DATABASE_URL,
		entities: [User, Ticket, Project, Organization, Comment],
		synchronize: false,
		migrations: [path.join(__dirname, './migrations/*')],
		logging: true,
	});

	await conn.runMigrations();

	const app = express();

	const RedisStore = connectRedis(session);
	const redis = new Redis(process.env.REDIS_URL);
	app.set('trust proxy', 1);
	app.use(
		cors({
			origin: process.env.CORS_ORIGIN,
			credentials: true,
		})
	);
	app.use(
		session({
			name: COOKIE_NAME,
			store: new RedisStore({
				client: redis,
				disableTouch: true,
			}),
			cookie: {
				maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
				httpOnly: true,
				sameSite: 'lax',
				secure: __prod__,
				domain: __prod__ ? '.workflo.codes' : undefined,
			},
			saveUninitialized: false,
			secret: process.env.SESSION_SECRET,
			resave: false,
		})
	);

	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [
				UserResolver,
				OrganizationResolver,
				ProjectResolver,
				TicketResolver,
				CommentResolver,
			],
			validate: false,
		}),
		context: ({ req, res }) => ({
			req,
			res,
			redis,
		}),
	});

	//creates the graphql endpoint on localhost
	apolloServer.applyMiddleware({
		app,
		cors: false,
	});

	app.listen(parseInt(process.env.PORT), () => {
		console.log('server started on localhost:4000');
	});
};

main().catch((err) => {
	console.error(err);
});
