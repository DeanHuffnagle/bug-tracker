import 'reflect-metadata';
import { DevTeam } from './entities/DevTeam';
import { Orginization } from './entities/Orginization';
import { Project } from './entities/Project';
import { Ticket } from './entities/Ticket';
import { User } from './entities/User';

const main = async () => {
	createConnection({
		type: 'postgres',
		host: 'localhost',
		port: 4000,
		username: 'postgres',
		password: 'postgres',
		database: 'BugTracker',
		entities: [User, Ticket, Project, Orginization, DevTeam],
		synchronize: true,
		logging: false,
	})
		.then((connection) => {
			// here you can start to work with your entities
		})
		.catch((error) => console.log(error));
};
