import { Type } from "class-transformer";
import { IsEnum, IsInt, IsOptional, Min } from "class-validator";
import { TaskStatus } from "src/common/types";

export class PaginationDto {
	@IsEnum(TaskStatus)
	status: TaskStatus;

	@IsInt()
	@Type(() => Number)
	@Min(1)
	@IsOptional()
	page?: number;

	@IsInt()
	@Type(() => Number)
	@Min(1)
	@IsOptional()
	pageSize?: number;
}
