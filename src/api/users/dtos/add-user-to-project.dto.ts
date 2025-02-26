import { IsUUID } from "class-validator";

export class AddUserToProjectDto {
	@IsUUID()
	userId: string;

	@IsUUID()
	projectId: string;
}
