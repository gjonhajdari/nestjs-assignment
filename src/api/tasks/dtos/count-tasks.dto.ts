import { IsEnum, IsUUID } from "class-validator";
import { TaskStatus } from "../task.entity";

export class CountTasksDto {
	@IsUUID()
	userId: string;

	@IsEnum(TaskStatus)
	status: TaskStatus;
}
