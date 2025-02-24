import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../users/user.entity";
import { UsersService } from "../users/users.service";
import { Project } from "./project.entity";
import { ProjectsController } from "./projects.controller";
import { ProjectsService } from "./projects.service";

@Module({
	imports: [TypeOrmModule.forFeature([Project, User])],
	controllers: [ProjectsController],
	providers: [ProjectsService, UsersService],
})
export class ProjectsModule {}
