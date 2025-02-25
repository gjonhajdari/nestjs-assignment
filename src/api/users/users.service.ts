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

	async findById(id: number): Promise<User> {
		const user = await this.userRepository.findOne({ where: { id } });
		if (!user) throw new NotFoundException("User does not exist");

		return user;
	}

	async findByEmail(email: string): Promise<User | null> {
		const user = await this.userRepository.findOne({ where: { email } });
		return user;
	}

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

	async update(id: number, attrs: Partial<User>): Promise<User> {
		const user = await this.findById(id);

		Object.assign(user, attrs);
		return this.userRepository.save(user);
	}

	async delete(id: number): Promise<User> {
		const user = await this.findById(id);
		return this.userRepository.remove(user);
	}

	async addToProject(userId: number, projectId: number): Promise<User> {
		const user = await this.findById(userId);
		const project = await this.projectsService.findById(projectId);

		user.projects = [project];
		return this.userRepository.save(user);
	}
}
