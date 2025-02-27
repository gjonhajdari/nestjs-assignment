import { IsEnum, IsOptional, IsString, IsUUID } from "class-validator";
import { TaskStatus } from "src/common/types";

export class UpdateTaskDto {
	@IsString()
	@IsOptional()
	name: string;

	@IsString()
	@IsOptional()
	description: string;

	@IsEnum(TaskStatus)
	@IsOptional()
	status: TaskStatus;

	@IsUUID()
	@IsOptional()
	userId?: string;

	@IsUUID()
	@IsOptional()
	projectId?: string;
}
