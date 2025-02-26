import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { Project } from "../projects/project.entity";
import { User } from "../users/user.entity";

export enum TaskStatus {
	TODO = "TODO",
	DOING = "DOING",
	DONE = "DONE",
}

@Entity()
export class Task {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column()
	name: string;

	@Column({ type: "text" })
	description: string;

	@Column({
		type: "enum",
		enum: TaskStatus,
		default: TaskStatus.TODO,
	})
	status: TaskStatus;

	@CreateDateColumn({ name: "created_at" })
	createdAt: Date;

	@UpdateDateColumn({ name: "updated_at" })
	updatedAt: Date;

	@ManyToOne(
		() => Project,
		(project) => project.tasks,
	)
	project: Project;

	@ManyToOne(
		() => User,
		(user) => user.tasks,
	)
	user: User;
}
