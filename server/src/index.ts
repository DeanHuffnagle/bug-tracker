import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { Comment } from './entities/Comment';

import { Organization } from './entities/Organization';
import { Project } from './entities/Project';
import { Ticket } from './entities/Ticket';
import { User } from './entities/User';

const main = async () => {
	await createConnection({
		type: 'postgres',
		host: 'localhost',
		port: 4000,
		username: 'postgres',
		password: 'postgres',
		database: 'BugTracker',
		entities: [User, Ticket, Project, Organization, Comment],
		synchronize: true,
		logging: true,
	});
};

main();
