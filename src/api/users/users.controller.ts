import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseUUIDPipe,
	Patch,
	Post,
} from "@nestjs/common";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { User } from "./user.entity";
import { UsersService } from "./users.service";

@Controller("/users")
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get("/:email")
	async findUser(@Param("email") email: string): Promise<User | null> {
		return this.usersService.findByEmail(email, true);
	}

	@Post()
	async createUser(@Body() body: CreateUserDto): Promise<User> {
		return this.usersService.createUser(body);
	}

	@Patch("/:id")
	async updateUser(
		@Param("id", ParseUUIDPipe) id: string,
		@Body() body: UpdateUserDto,
	): Promise<User> {
		return this.usersService.updateUser(id, body);
	}

	@Delete("/:id")
	async deleteUser(@Param("id", ParseUUIDPipe) id: string): Promise<User> {
		return this.usersService.deleteUser(id);
	}
}
