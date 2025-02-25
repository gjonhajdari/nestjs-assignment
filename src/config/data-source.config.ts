import * as dotenv from "dotenv";
import { Project } from "src/api/projects/project.entity";
import { Task } from "src/api/tasks/task.entity";
import { User } from "src/api/users/user.entity";
dotenv.config();

export const config = {
	name: "default",
	type: "postgres",
	host: process.env.TYPEORM_HOST,
	port: process.env.TYPEORM_PORT || 5432,
	username: process.env.TYPEORM_USERNAME,
	password: process.env.TYPEORM_PASSWORD,
	database: process.env.TYPEORM_DATABASE,
	entities: [process.env.TYPEORM_ENTITIES],
	synchronize: true,
	dropSchema: false,
};

export const configNoSynchronize = {
	name: "default",
	type: "postgres",
	host: process.env.TYPEORM_HOST,
	port: process.env.TYPEORM_PORT || 5432,
	username: process.env.TYPEORM_USERNAME,
	password: process.env.TYPEORM_PASSWORD,
	database: process.env.TYPEORM_DATABASE,
	entities: [User, Project, Task],
	migrations: [process.env.TYPEORM_MIGRATIONS],
	migrationsRun: false,
	synchronize: false,
};
