import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProjectsService } from "../projects/projects.service";
import { UsersService } from "../users/users.service";
import { CountTasksDto } from "./dtos/count-tasks.dto";
import { CreateTaskDto } from "./dtos/create-task.dto";
import { Task, TaskStatus } from "./task.entity";

@Injectable()
export class TasksService {
	constructor(
		@InjectRepository(Task) private taskRepository: Repository<Task>,
		private usersService: UsersService,
		private projectsService: ProjectsService,
	) {}

	async findById(id: number): Promise<Task> {
		const task = await this.taskRepository.findOne({ where: { id } });
		if (!task) throw new NotFoundException("Task does not exist");

		return task;
	}

	async findByUserAndStatus(
		userId: number,
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

	async count(payload: CountTasksDto): Promise<number> {
		const tasks = await this.findByUserAndStatus(
			payload.userId,
			payload.status,
		);
		return tasks.length;
	}

	async create(payload: CreateTaskDto): Promise<Task> {
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

	async update(id: number, attrs: Partial<Task>): Promise<Task> {
		const task = await this.findById(id);

		Object.assign(task, attrs);
		return this.taskRepository.save(task);
	}

	async delete(id: number): Promise<Task> {
		const task = await this.findById(id);
		return this.taskRepository.remove(task);
	}
}
