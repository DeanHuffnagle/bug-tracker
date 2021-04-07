import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { Comment } from './entities/Comment';
import { Organization } from './entities/Organization';
import { Project } from './entities/Project';
import { Ticket } from './entities/Ticket';
import { User } from './entities/User';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './resolvers/hello';

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
	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [HelloResolver],
			validate: false,
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
