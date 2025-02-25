import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Project } from "./project.entity";

@Injectable()
export class ProjectsService {
	constructor(
		@InjectRepository(Project) private projectRepository: Repository<Project>,
	) {}

	/**
	 * Retrieves a project by its ID from the database
	 *
	 * @param id - The unique id of the project
	 * @returns Promise that resolves to the found Project entity
	 * @throws {NotFoundException} - If no project is found with the given ID
	 */
	async findById(id: number): Promise<Project> {
		const project = await this.projectRepository.findOne({ where: { id } });
		if (!project) throw new NotFoundException("Project does not exist");

		return project;
	}

	/**
	 * Retrieves a project by its name from the database
	 *
	 * @param name - The name of the project
	 * @returns Promise that resolves to the found Project entity
	 * @throws {NotFoundException} - If no project is found with the given name
	 */
	async findByName(name: string): Promise<Project> {
		const project = await this.projectRepository.findOne({ where: { name } });
		if (!project)
			throw new NotFoundException(`Project '${name}' does not exist`);

		return project;
	}

	/**
	 * Creates a new project and saves it to the database
	 *
	 * @param name - The name of the project
	 * @param description - The project description
	 * @returns Promise that resolves to the created Project entity
	 */
	async create(name: string, description: string): Promise<Project> {
		const project = await this.projectRepository.create({ name, description });
		return this.projectRepository.save(project);
	}

	/**
	 * Updates a specific project with the new given attributes
	 *
	 * @param id - The unique ID of the project
	 * @param attrs - Attributes of the Project entity to update
	 * @returns Promise that resolves to the updated Project entity
	 */
	async update(id: number, attrs: Partial<Project>) {
		const project = await this.findById(id);

		Object.assign(project, attrs);
		return this.projectRepository.save(project);
	}

	/**
	 * Deletes a project by its ID from the database
	 *
	 * @param id - The unique ID of the project
	 * @returns Promise that resolves to the updated Project entity
	 */
	async delete(id: number) {
		const project = await this.findById(id);
		return this.projectRepository.remove(project);
	}
}
