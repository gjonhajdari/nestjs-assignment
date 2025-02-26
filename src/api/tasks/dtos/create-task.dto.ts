import { IsEnum, IsString, IsUUID } from "class-validator";
import { TaskStatus } from "../task.entity";

export class CreateTaskDto {
	@IsString()
	name: string;

	@IsString()
	description: string;

	@IsEnum(TaskStatus)
	status: TaskStatus;

	@IsUUID()
	userId: string;

	@IsUUID()
	projectId: string;
}
