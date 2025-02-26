import * as dotenv from "dotenv";

dotenv.config({
	path: `.env.${process.env.NODE_ENV}`,
});

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
	entities: [process.env.TYPEORM_ENTITIES],
	migrations: [process.env.TYPEORM_MIGRATIONS],
	migrationsRun: false,
	synchronize: false,
};
