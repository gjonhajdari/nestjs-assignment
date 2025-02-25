import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Project } from "./project.entity";

@Injectable()
export class ProjectsService {
	constructor(
		@InjectRepository(Project) private projectRepository: Repository<Project>,
	) {}

	async findById(id: number): Promise<Project> {
		const project = await this.projectRepository.findOne({ where: { id } });
		if (!project) throw new NotFoundException("Project does not exist");

		return project;
	}

	async findByName(name: string): Promise<Project> {
		const project = await this.projectRepository.findOne({ where: { name } });
		if (!project)
			throw new NotFoundException(`Project '${name}' does not exist`);

		return project;
	}

	async create(name: string, description: string): Promise<Project> {
		const project = await this.projectRepository.create({ name, description });
		return this.projectRepository.save(project);
	}

	async update(id: number, attrs: Partial<Project>) {
		const project = await this.findById(id);

		Object.assign(project, attrs);
		return this.projectRepository.save(project);
	}

	async delete(id: number) {
		const project = await this.findById(id);
		return this.projectRepository.remove(project);
	}
}
