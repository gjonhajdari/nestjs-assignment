import { IsOptional, IsString, IsUUID } from "class-validator";

export class UpdateProjectDto {
	@IsString()
	@IsOptional()
	name: string;

	@IsString()
	@IsOptional()
	description: string;

	@IsUUID()
	@IsOptional()
	userId?: string;
}
