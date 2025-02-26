import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { omit } from "lodash";
import { DbUtilsService } from "src/common/services/db-utils.service";
import { Repository } from "typeorm";
import { UsersService } from "../users/users.service";
import { UpdateProjectDto } from "./dtos/update-project.dto";
import { Project } from "./project.entity";

@Injectable()
export class ProjectsService {
	constructor(
		@InjectRepository(Project) private projectRepository: Repository<Project>,
		private usersService: UsersService,
		private dbUtilsService: DbUtilsService,
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
	async createProject(name: string, description: string): Promise<Project> {
		const project = await this.projectRepository.create({ name, description });
		return this.dbUtilsService.executeSafely(() =>
			this.projectRepository.save(project),
		);
	}

	/**
	 * Updates a specific project with the new given attributes
	 *
	 * @param id - The unique UUID of the project
	 * @param attrs - Attributes of the Project entity to update
	 * @returns Promise that resolves to the updated Project entity
	 */
	async updateProject(id: string, attrs: UpdateProjectDto) {
		const project = await this.findById(id);

		if (attrs.userId) {
			const user = await this.usersService.findById(attrs.userId);
			project.users = [user];
			attrs = omit(attrs, "userId");
		}

		const updatedProject = { ...project, ...attrs };

		return this.dbUtilsService.executeSafely(() =>
			this.projectRepository.save(updatedProject),
		);
	}

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

		return this.dbUtilsService.executeSafely(() =>
			this.projectRepository.save(project),
		);
	}

	/**
	 * Deletes a project by its UUID from the database
	 *
	 * @param id - The unique UUID of the project
	 * @returns Promise that resolves to the updated Project entity
	 */
	async deleteProject(id: string) {
		const project = await this.findById(id);

		return this.dbUtilsService.executeSafely(() =>
			this.projectRepository.remove(project),
		);
	}
}
