import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "../guards/auth.guard";
import { CountTasksDto } from "./dtos/count-tasks.dto";
import { CreateTaskDto } from "./dtos/create-task.dto";
import { UpdateTaskDto } from "./dtos/update-tesk.dto";
import { TaskStatus } from "./task.entity";
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

	@Get("/todo/:id")
	findTodo(@Param("id") id: string) {
		return this.tasksService.findByUserAndStatus(
			Number.parseInt(id),
			TaskStatus.TODO,
		);
	}

	@Get("/doing/:id")
	findDoing(@Param("id") id: string) {
		return this.tasksService.findByUserAndStatus(
			Number.parseInt(id),
			TaskStatus.DOING,
		);
	}

	@Get("/done/:id")
	findDone(@Param("id") id: string) {
		return this.tasksService.findByUserAndStatus(
			Number.parseInt(id),
			TaskStatus.DONE,
		);
	}

	@Post("/count")
	countTasks(@Body() body: CountTasksDto) {
		return this.tasksService.count(body);
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
