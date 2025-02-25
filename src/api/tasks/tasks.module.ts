import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProjectsModule } from "../projects/projects.module";
import { UsersModule } from "../users/users.module";
import { Task } from "./task.entity";
import { TasksController } from "./tasks.controller";
import { TasksService } from "./tasks.service";

@Module({
	imports: [TypeOrmModule.forFeature([Task]), UsersModule, ProjectsModule],
	controllers: [TasksController],
	providers: [TasksService],
})
export class TasksModule {}
