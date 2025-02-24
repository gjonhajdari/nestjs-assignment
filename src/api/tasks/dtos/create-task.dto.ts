import { IsEnum, IsIn, IsInt, IsString } from "class-validator";
import { TaskStatus } from "../task.entity";

export class CreateTaskDto {
	@IsString()
	name: string;

	@IsString()
	description: string;

	@IsEnum(TaskStatus)
	status: TaskStatus;

	@IsInt()
	userId: number;

	@IsInt()
	projectId: number;
}
