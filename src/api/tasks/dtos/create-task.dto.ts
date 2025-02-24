import { IsEnum, IsString } from "class-validator";
import { TaskStatus } from "../task.entity";

export class CreateTaskDto {
	@IsString()
	title: string;

	@IsString()
	description: string;

	@IsEnum(TaskStatus)
	status: TaskStatus;
}
