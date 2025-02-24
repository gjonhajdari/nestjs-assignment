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
import { ProjectsService } from "./projects.service";

@Controller("projects")
export class ProjectsController {
	constructor(private readonly projectsService: ProjectsService) {}

	@Get("/:id")
	findProject(@Param("id") id: string) {
		return this.projectsService.findById(Number.parseInt(id));
	}

	@Get("/name/:name")
	findProjectByName(@Param("name") name: string) {
		return this.projectsService.findByName(name);
	}

	@Post()
	createProject(@Body() body: CreateProjectDto) {
		return this.projectsService.create(body.name, body.description);
	}

	@Patch("/:id")
	updateProject(@Param("id") id: string, @Body() body: UpdateProjectDto) {
		return this.projectsService.update(Number.parseInt(id), body);
	}

	@Delete("/:id")
	deleteProject(@Param("id") id: string) {
		return this.projectsService.delete(Number.parseInt(id));
	}
}
