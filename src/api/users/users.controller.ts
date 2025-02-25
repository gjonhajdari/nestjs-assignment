import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
} from "@nestjs/common";
import { AddUserToProjectDto } from "./dtos/add-user-to-project.dto";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { User } from "./user.entity";
import { UsersService } from "./users.service";

@Controller("/users")
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get("/:email")
	async findUser(@Param("email") email: string): Promise<User | null> {
		return this.usersService.findByEmail(email);
	}

	@Post()
	async createUser(@Body() body: CreateUserDto): Promise<User> {
		return this.usersService.create(body);
	}

	@Patch()
	async addUserToProject(@Body() body: AddUserToProjectDto): Promise<User> {
		return this.usersService.addToProject(body.userId, body.projectId);
	}

	@Patch("/:id")
	async updateUser(
		@Param("id") id: string,
		@Body() body: UpdateUserDto,
	): Promise<User> {
		return this.usersService.update(Number.parseInt(id), body);
	}

	@Delete("/:id")
	async deleteUser(@Param("id") id: string): Promise<User> {
		return this.usersService.delete(Number.parseInt(id));
	}
}
