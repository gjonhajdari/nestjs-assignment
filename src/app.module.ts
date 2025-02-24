import { Module } from "@nestjs/common";
import { ProjectsModule } from "./api/projects/projects.module";
import { TasksModule } from "./api/tasks/tasks.module";
import { UsersModule } from "./api/users/users.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
	imports: [UsersModule, ProjectsModule, TasksModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
