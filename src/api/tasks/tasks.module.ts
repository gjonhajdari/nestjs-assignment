import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Project } from "../projects/project.entity";
import { ProjectsService } from "../projects/projects.service";
import { User } from "../users/user.entity";
import { UsersService } from "../users/users.service";
import { Task } from "./task.entity";
import { TasksController } from "./tasks.controller";
import { TasksService } from "./tasks.service";

@Module({
	imports: [TypeOrmModule.forFeature([Task, User, Project])],
	controllers: [TasksController],
	providers: [TasksService, UsersService, ProjectsService],
})
export class TasksModule {}
