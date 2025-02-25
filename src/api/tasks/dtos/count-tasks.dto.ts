import { IsEnum, IsInt } from "class-validator";
import { TaskStatus } from "../task.entity";

export class CountTasksDto {
	@IsInt()
	userId: number;

	@IsEnum(TaskStatus)
	status: TaskStatus;
}
