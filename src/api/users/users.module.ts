import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Project } from "../projects/project.entity";
import { ProjectsModule } from "../projects/projects.module";
import { ProjectsService } from "../projects/projects.service";
import { User } from "./user.entity";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

@Module({
	imports: [TypeOrmModule.forFeature([User, Project])],
	controllers: [UsersController],
	providers: [UsersService, ProjectsService],
})
export class UsersModule {}
