import { IsInt } from "class-validator";

export class AddUserToProjectDto {
	@IsInt()
	projectId: number;

	@IsInt()
	userId: number;
}
