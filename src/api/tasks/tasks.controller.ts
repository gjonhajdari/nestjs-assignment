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

	calculateSkip(pageSize, page): number {
		return (page - 1) * pageSize;
	}

	async findTasks(
		userId: string,
		status: TaskStatus,
		page = 1,
		pageSize = 10,
	): Promise<Task[]> {
		const skip = this.calculateSkip(page, pageSize);
		return this.tasksService.findByUserAndStatus(
			userId,
			status,
			pageSize,
			skip,
		);
	}

	@Get("/:id")
	async findById(@Param("id", ParseUUIDPipe) id: string): Promise<Task> {
		return this.tasksService.findById(id);
	}

	@Post()
	async createTask(@Body() body: CreateTaskDto): Promise<Task> {
		return this.tasksService.create(body);
	}

	@Get("/todo/:userId")
	async findTodo(
		@Param("userId", ParseUUIDPipe) userId: string,
		@Query() params: PaginationDto,
	): Promise<Task[]> {
		return this.findTasks(
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
		return this.findTasks(
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
		return this.findTasks(
			userId,
			TaskStatus.DONE,
			params.page,
			params.pageSize,
		);
	}

	@Post("/count")
	async countTasks(@Body() body: CountTasksDto): Promise<number> {
		return this.tasksService.count(body);
	}

	@Patch("/:id")
	async updateTask(
		@Param("id", ParseUUIDPipe) id: string,
		@Body() body: UpdateTaskDto,
	): Promise<Task> {
		return this.tasksService.update(id, body);
	}

	@Delete("/:id")
	async deleteTask(@Param("id", ParseUUIDPipe) id: string): Promise<Task> {
		return this.tasksService.delete(id);
	}
}
