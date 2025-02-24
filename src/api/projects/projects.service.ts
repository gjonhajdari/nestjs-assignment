import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UsersService } from "../users/users.service";
import { Project } from "./project.entity";

@Injectable()
export class ProjectsService {
	constructor(
		@InjectRepository(Project) private repo: Repository<Project>,
		private usersService: UsersService,
	) {}

	findById(id: number) {
		return this.repo.findOne({ where: { id } });
	}

	findByName(name: string) {
		return this.repo.findOne({ where: { name } });
	}

	async create(name: string, description: string) {
		const project = await this.repo.create({ name, description });
		return this.repo.save(project);
	}

	async update(id: number, attrs: Partial<Project>) {
		const project = await this.repo.findOne({ where: { id } });
		if (!project) throw new NotFoundException("Project not found");

		Object.assign(project, attrs);
		return this.repo.save(project);
	}

	async delete(id: number) {
		const project = await this.repo.findOne({ where: { id } });
		if (!project) throw new NotFoundException("Project not found");

		return this.repo.remove(project);
	}

	async addUser(projectId: number, userId: number) {
		const project = await this.repo.findOne({ where: { id: projectId } });
		if (!project) throw new NotFoundException("Project not found");

		const user = await this.usersService.findById(userId);
		if (!user) throw new NotFoundException("User not found");

		project.users.push(user);
		return this.repo.save(project);
	}
}
