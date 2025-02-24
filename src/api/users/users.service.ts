import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProjectsService } from "../projects/projects.service";
import { User } from "./user.entity";

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User) private repo: Repository<User>,
		private projectsService: ProjectsService,
	) {}

	findById(id: number) {
		return this.repo.findOne({ where: { id } });
	}

	findByEmail(email: string) {
		return this.repo.findOne({ where: { email } });
	}

	async create(
		firstName: string,
		lastName: string,
		email: string,
		location: string,
	) {
		const user = await this.findByEmail(email);
		if (user) throw new BadRequestException("User already exists");

		const newUser = await this.repo.create({
			firstName,
			lastName,
			email,
			location,
		});

		return this.repo.save(newUser);
	}

	async update(id: number, attrs: Partial<User>) {
		const user = await this.repo.findOne({ where: { id } });
		if (!user) throw new NotFoundException("User not found");

		Object.assign(user, attrs);
		return this.repo.save(user);
	}

	async delete(id: number) {
		const user = await this.repo.findOne({ where: { id } });
		if (!user) throw new NotFoundException("User not found");

		return this.repo.remove(user);
	}

	async addToProject(userId: number, projectId: number) {
		const user = await this.repo.findOne({ where: { id: userId } });
		if (!user) throw new NotFoundException("User not found");

		const project = await this.projectsService.findById(projectId);
		if (!project) throw new NotFoundException("Project not found");

		user.projects = [project];
		return this.repo.save(user);
	}
}
