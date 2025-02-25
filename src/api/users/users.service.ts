import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProjectsService } from "../projects/projects.service";
import { CreateUserDto } from "./dtos/create-user.dto";
import { User } from "./user.entity";

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User) private userRepository: Repository<User>,
		private projectsService: ProjectsService,
	) {}

	/**
	 * Retrieves a user by its ID from the database
	 *
	 * @param id - The unique id of the user
	 * @returns Promise that resolves to the found User entity
	 * @throws {NotFoundException} - If no user is found with the given ID
	 */
	async findById(id: number): Promise<User> {
		const user = await this.userRepository.findOne({ where: { id } });
		if (!user) throw new NotFoundException("User does not exist");

		return user;
	}

	/**
	 * Retrieves a user by its email address from the database
	 *
	 * @param email - The unique email of the user
	 * @returns Promise that resolves to the found User entity or a null value
	 */
	async findByEmail(email: string): Promise<User | null> {
		const user = await this.userRepository.findOne({ where: { email } });
		return user;
	}

	/**
	 * Creates a new user and saves it to the database
	 *
	 * @param payload - The required information to create a user
	 * @returns Promise that resolves to the created User entity
	 * @throws {BadRequestException} - If a user with the given email already exist
	 */
	async create(payload: CreateUserDto): Promise<User> {
		const user = await this.findByEmail(payload.email);
		if (user) throw new BadRequestException("Email is already taken");

		const newUser = await this.userRepository.create({
			firstName: payload.firstName,
			lastName: payload.lastName,
			email: payload.email,
			location: payload.location,
		});

		return this.userRepository.save(newUser);
	}

	/**
	 * Updates a specific user with the new given attributes
	 *
	 * @param id - The unique ID of the user
	 * @param attrs - Attributes of the User entity to update
	 * @returns Promise that resolves to the updated User entity
	 */
	async update(id: number, attrs: Partial<User>): Promise<User> {
		const user = await this.findById(id);

		Object.assign(user, attrs);
		return this.userRepository.save(user);
	}

	/**
	 * Deletes a user by its ID from the database
	 *
	 * @param id - The unique ID of the user
	 * @returns Promise that resolves to the updated User entity
	 */
	async delete(id: number): Promise<User> {
		const user = await this.findById(id);
		return this.userRepository.remove(user);
	}

	/**
	 * Adds a user to a specific project
	 *
	 * @param userId The unique ID of the user
	 * @param projectId The unique ID of the project
	 * @returns Promise that resolves to the added User entity
	 */
	async addToProject(userId: number, projectId: number): Promise<User> {
		const user = await this.findById(userId);
		const project = await this.projectsService.findById(projectId);

		user.projects = [project];
		return this.userRepository.save(user);
	}
}
