import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseUUIDPipe,
	Patch,
	Post,
	Query,
} from "@nestjs/common";
import { CountTasksDto } from "./dtos/count-tasks.dto";
import { CreateTaskDto } from "./dtos/create-task.dto";
import { PaginationDto } from "./dtos/pagination.dto";
import { UpdateTaskDto } from "./dtos/update-tesk.dto";
import { Task, TaskStatus } from "./task.entity";
import { TasksService } from "./tasks.service";

@Controller("/tasks")
export class TasksController {
	constructor(private readonly tasksService: TasksService) {}

	@Get("/:id")
	async findById(@Param("id", ParseUUIDPipe) id: string): Promise<Task> {
		return this.tasksService.findById(id);
	}

	@Post()
	async createTask(@Body() body: CreateTaskDto): Promise<Task> {
		return this.tasksService.createTask(body);
	}

	@Get("/todo/:userId")
	async findTodo(
		@Param("userId", ParseUUIDPipe) userId: string,
		@Query() params: PaginationDto,
	): Promise<Task[]> {
		return this.tasksService.findTasksByUserAndStatus(
			userId,
			TaskStatus.TODO,
			params.page,
			params.pageSize,
		);
	}

	@Get("/doing/:userId")
	async findDoing(
		@Param("userId", ParseUUIDPipe) userId: string,
		@Query() params: PaginationDto,
	): Promise<Task[]> {
		return this.tasksService.findTasksByUserAndStatus(
			userId,
			TaskStatus.DOING,
			params.page,
			params.pageSize,
		);
	}

	@Get("/done/:userId")
	async findDone(
		@Param("userId", ParseUUIDPipe) userId: string,
		@Query() params: PaginationDto,
	): Promise<Task[]> {
		return this.tasksService.findTasksByUserAndStatus(
			userId,
			TaskStatus.DONE,
			params.page,
			params.pageSize,
		);
	}

	@Post("/count")
	async countTasks(@Body() body: CountTasksDto): Promise<number> {
		return this.tasksService.countTasks(body);
	}

	@Patch("/:id")
	async updateTask(
		@Param("id", ParseUUIDPipe) id: string,
		@Body() body: UpdateTaskDto,
	): Promise<Task> {
		return this.tasksService.updateTask(id, body);
	}

	@Delete("/:id")
	async deleteTask(@Param("id", ParseUUIDPipe) id: string): Promise<Task> {
		return this.tasksService.deleteTask(id);
	}
}
