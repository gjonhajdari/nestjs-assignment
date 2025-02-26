import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { Project } from "../projects/project.entity";
import { User } from "../users/user.entity";

export enum TaskStatus {
	TODO = "TODO",
	DOING = "DOING",
	IN_REVIEW = "IN REVIEW",
	DONE = "DONE",
	DROPPED = "DROPPED",
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
		{ nullable: true, onDelete: "SET NULL" },
	)
	@JoinColumn({ name: "projectId" })
	project: Project;

	@ManyToOne(
		() => User,
		(user) => user.tasks,
		{ nullable: true, onDelete: "SET NULL" },
	)
	@JoinColumn({ name: "userId" })
	user: User;
}
