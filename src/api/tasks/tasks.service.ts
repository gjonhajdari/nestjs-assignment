import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { omit } from "lodash";
import { Repository } from "typeorm";
import { ProjectsService } from "../projects/projects.service";
import { UsersService } from "../users/users.service";
import { CountTasksDto } from "./dtos/count-tasks.dto";
import { CreateTaskDto } from "./dtos/create-task.dto";
import { UpdateTaskDto } from "./dtos/update-tesk.dto";
import { Task, TaskStatus } from "./task.entity";

@Injectable()
export class TasksService {
	constructor(
		@InjectRepository(Task) private taskRepository: Repository<Task>,
		private usersService: UsersService,
		private projectsService: ProjectsService,
	) {}

	/**
	 * Retrieves a task by its UUID from the database
	 *
	 * @param id - The unique UUID of the task
	 * @returns Promise that resolves to the found Task entity
	 * @throws {NotFoundException} - If no task is found with the given UUID
	 */
	async findById(
		id: string,
		loadUser = false,
		loadProject = false,
	): Promise<Task> {
		const task = await this.taskRepository.findOne({
			where: { id },
			relations: { user: loadUser, project: loadProject },
		});
		if (!task) throw new NotFoundException("Task does not exist");

		return task;
	}

	/**
	 * Retrieves a task by its UUID from the database
	 *
	 * @param userId - The unique UUID of the user
	 * @param status - The completion status of the task
	 * @param take - The number of entities returned
	 * @param skip - The offset from which entities are taken
	 * @returns Promise that resolves to the found Task entity
	 */
	async findByUserAndStatus(
		userId: string,
		status: TaskStatus,
		take?: number,
		skip?: number,
	): Promise<Task[]> {
		const user = await this.usersService.findById(userId);

		return this.taskRepository.find({
			select: {
				id: true,
				name: true,
				description: true,
				status: true,
				createdAt: true,
				project: { name: true },
			},
			relations: { project: true },
			where: { user, status },
			take,
			skip,
		});
	}

	/**
	 * Retrieves the amount of tasks assigned to a user based on the status
	 *
	 * @param payload - Object containing the user UUID and task status
	 * @returns Promise that resolves to the number of tasks
	 */
	async count(payload: CountTasksDto): Promise<number> {
		const tasks = await this.findByUserAndStatus(
			payload.userId,
			payload.status,
		);
		return tasks.length;
	}

	/**
	 * Creates a new task and saves it to the database
	 *
	 * @param payload - The required information to create a task, and the associated user UUID and project UUID
	 * @returns Promise that resolves to the created Task entity
	 */
	async createTask(payload: CreateTaskDto): Promise<Task> {
		const task = await this.taskRepository.create({
			name: payload.name,
			description: payload.description,
			status: payload.status,
		});

		const user = await this.usersService.findById(payload.userId);
		const project = await this.projectsService.findById(payload.projectId);

		task.user = user;
		task.project = project;
		return this.taskRepository.save(task);
	}

	/**
	 * Updates a specific task with the new given attributes
	 *
	 * @param id - The unique UUID of the task
	 * @param attrs - Attributes of the Task entity to update, with optional user and project UUIDs
	 * @returns Promise that resolves to the updated Task entity
	 */
	async updateTask(id: string, attrs: UpdateTaskDto): Promise<Task> {
		const task = await this.findById(id);

		if (attrs.userId) {
			const user = await this.usersService.findById(attrs.userId);
			task.user = user;
			attrs = omit(attrs, "userId");
		}

		if (attrs.projectId) {
			const project = await this.projectsService.findById(attrs.projectId);
			task.project = project;
			attrs = omit(attrs, "projectId");
		}

		const updatedTask = { ...task, ...attrs };
		return this.taskRepository.save(updatedTask);
	}

	/**
	 * Deletes a task by its UUID from the database
	 *
	 * @param id - The unique UUID of the task
	 * @returns Promise that resolves to the updated Task entity
	 */
	async deleteTask(id: string): Promise<Task> {
		const task = await this.findById(id);
		return this.taskRepository.remove(task);
	}
}
