import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
} from "@nestjs/common";
import { CreateTaskDto } from "./dtos/create-task.dto";
import { UpdateTaskDto } from "./dtos/update-tesk.dto";
import { TasksService } from "./tasks.service";

@Controller("/tasks")
export class TasksController {
	constructor(private readonly tasksService: TasksService) {}

	@Get("/:id")
	findTask(@Param("id") id: string) {
		return this.tasksService.findById(Number.parseInt(id));
	}

	@Post()
	createTask(@Body() body: CreateTaskDto) {
		return this.tasksService.create(
			body.name,
			body.description,
			body.status,
			body.userId,
			body.projectId,
		);
	}

	@Patch("/:id")
	updateTask(@Param("id") id: string, @Body() body: UpdateTaskDto) {
		return this.tasksService.update(Number.parseInt(id), body);
	}

	@Delete("/:id")
	deleteTask(@Param("id") id: string) {
		return this.tasksService.delete(Number.parseInt(id));
	}
}
