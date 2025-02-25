import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
} from "@nestjs/common";
import { CreateProjectDto } from "./dtos/create-project.dto";
import { UpdateProjectDto } from "./dtos/update-project.dto";
import { Project } from "./project.entity";
import { ProjectsService } from "./projects.service";

@Controller("/projects")
export class ProjectsController {
	constructor(private readonly projectsService: ProjectsService) {}

	@Get("/:id")
	async findProject(@Param("id") id: string): Promise<Project> {
		return this.projectsService.findById(Number.parseInt(id));
	}

	@Get("/name/:name")
	async findProjectByName(@Param("name") name: string): Promise<Project> {
		return this.projectsService.findByName(name);
	}

	@Post()
	async createProject(@Body() body: CreateProjectDto): Promise<Project> {
		return this.projectsService.create(body.name, body.description);
	}

	@Patch("/:id")
	async updateProject(
		@Param("id") id: string,
		@Body() body: UpdateProjectDto,
	): Promise<Project> {
		return this.projectsService.update(Number.parseInt(id), body);
	}

	@Delete("/:id")
	async deleteProject(@Param("id") id: string): Promise<Project> {
		return this.projectsService.delete(Number.parseInt(id));
	}
}
