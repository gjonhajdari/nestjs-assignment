import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Project } from "./api/projects/project.entity";
import { ProjectsModule } from "./api/projects/projects.module";
import { Task } from "./api/tasks/task.entity";
import { TasksModule } from "./api/tasks/tasks.module";
import { User } from "./api/users/user.entity";
import { UsersModule } from "./api/users/users.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		TypeOrmModule.forRootAsync({
			inject: [ConfigService],
			useFactory: (config: ConfigService) => {
				return {
					type: "postgres",
					host: config.get("DB_HOST"),
					port: config.get("DB_PORT"),
					username: config.get("DB_USERNAME"),
					password: config.get("DB_PASSWORD"),
					database: config.get("DB_DATABASE"),
					entities: [User, Project, Task],
					synchronize: true,
				};
			},
		}),
		UsersModule,
		ProjectsModule,
		TasksModule,
	],
	controllers: [AppController],
	providers: [AppService, ConfigService],
})
export class AppModule {}
