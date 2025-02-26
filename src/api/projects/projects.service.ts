import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UsersService } from "../users/users.service";
import { UpdateProjectDto } from "./dtos/update-project.dto";
import { Project } from "./project.entity";

@Injectable()
export class ProjectsService {
	constructor(
		@InjectRepository(Project) private projectRepository: Repository<Project>,
		private usersService: UsersService,
	) {}

	/**
	 * Retrieves a project by its UUID from the database
	 *
	 * @param id - The unique id of the project
	 * @returns Promise that resolves to the found Project entity
	 * @throws {NotFoundException} - If no project is found with the given UUID
	 */
	async findById(id: string, loadUser = false): Promise<Project> {
		const project = await this.projectRepository.findOne({
			where: { id },
			relations: { users: loadUser },
		});

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
	 * @param id - The unique UUID of the project
	 * @param attrs - Attributes of the Project entity to update
	 * @returns Promise that resolves to the updated Project entity
	 */
	async update(id: number, attrs: Partial<Project>) {
		const project = await this.findById(id);


	/**
	 * Adds a user to a specific project
	 *
	 * @param projectId The unique UUID of the project
	 * @param userId The unique UUID of the user
	 * @returns Promise that resolves to the added Project entity
	 * @throws {BadRequestException} - If user is already added to the project
	 */
	async addUser(projectId: string, userId: string): Promise<Project> {
		const project = await this.findById(projectId, true);
		const user = await this.usersService.findById(userId);

		if (project.users.map((u) => u.id).includes(userId)) {
			throw new BadRequestException("User is already added to project");
		}

		project.users.push(user);
		return this.projectRepository.save(project);
	}

	/**
	 * Deletes a project by its UUID from the database
	 *
	 * @param id - The unique UUID of the project
	 * @returns Promise that resolves to the updated Project entity
	 */
	async delete(id: string) {
		const project = await this.findById(id);
		return this.projectRepository.remove(project);
	}
}
