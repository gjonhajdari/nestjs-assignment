import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProjectsService } from "../projects/projects.service";
import { UsersService } from "../users/users.service";
import { Task, TaskStatus } from "./task.entity";

@Injectable()
export class TasksService {
	constructor(
		@InjectRepository(Task) private repo: Repository<Task>,
		private usersService: UsersService,
		private projectsService: ProjectsService,
	) {}

	findById(id: number) {
		return this.repo.findOne({ where: { id } });
	}

	async create(
		name: string,
		description: string,
		status: TaskStatus,
		userId: number,
		projectId: number,
	) {
		const task = await this.repo.create({ name, description, status });

		const user = await this.usersService.findById(userId);
		if (!user) throw new NotFoundException("User does not exist");

		const project = await this.projectsService.findById(projectId);
		if (!project) throw new NotFoundException("Project does not exist");

		task.user = user;
		task.project = project;
		return this.repo.save(task);
	}

	async update(id: number, attrs: Partial<Task>) {
		const task = await this.repo.findOne({ where: { id } });
		if (!task) throw new NotFoundException("Task not found");

		Object.assign(task, attrs);
		return this.repo.save(task);
	}

	async delete(id: number) {
		const task = await this.repo.find({ where: { id } });
		if (!task) throw new NotFoundException("Task not found");

		return this.repo.remove(task);
	}
}
