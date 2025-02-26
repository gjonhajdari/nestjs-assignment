import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseUUIDPipe,
	Patch,
	Post,
} from "@nestjs/common";
import { AddUserToProjectDto } from "../users/dtos/add-user-to-project.dto";
import { CreateProjectDto } from "./dtos/create-project.dto";
import { UpdateProjectDto } from "./dtos/update-project.dto";
import { Project } from "./project.entity";
import { ProjectsService } from "./projects.service";

@Controller("/projects")
export class ProjectsController {
	constructor(private readonly projectsService: ProjectsService) {}

	@Get("/:id")
	async findProject(@Param("id", ParseUUIDPipe) id: string): Promise<Project> {
		return this.projectsService.findById(id);
	}

	@Get("/name/:name")
	async findProjectByName(@Param("name") name: string): Promise<Project> {
		return this.projectsService.findByName(name);
	}

	@Post()
	async createProject(@Body() body: CreateProjectDto): Promise<Project> {
		return this.projectsService.createProject(body.name, body.description);
	}

	@Patch()
	async addUserToProject(@Body() body: AddUserToProjectDto): Promise<Project> {
		return this.projectsService.addUser(body.projectId, body.userId);
	}

	@Patch("/:id")
	async updateProject(
		@Param("id", ParseUUIDPipe) id: string,
		@Body() body: UpdateProjectDto,
	): Promise<Project> {
		return this.projectsService.updateProject(id, body);
	}

	@Delete("/:id")
	async deleteProject(
		@Param("id", ParseUUIDPipe) id: string,
	): Promise<Project> {
		return this.projectsService.deleteProject(id);
	}
}
