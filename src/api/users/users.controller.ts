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
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get("/:email")
	findUser(@Param("email") email: string) {
		return this.usersService.findByEmail(email);
	}

	@Post()
	createUser(@Body() body: CreateUserDto) {
		return this.usersService.create(
			body.firstName,
			body.lastName,
			body.email,
			body.location,
		);
	}

	@Patch()
	addUserToProject(@Body() body: AddUserToProjectDto) {
		return this.usersService.addToProject(body.userId, body.projectId);
	}

	@Patch("/:id")
	updateUser(@Param("id") id: string, @Body() body: UpdateUserDto) {
		return this.usersService.update(Number.parseInt(id), body);
	}

	@Delete("/:id")
	deleteUser(@Param("id") id: string) {
		return this.usersService.delete(Number.parseInt(id));
	}
}
