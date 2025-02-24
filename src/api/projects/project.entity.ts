import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToMany,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { Task } from "../tasks/task.entity";
import { User } from "../users/user.entity";

@Entity()
export class Project {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column({ type: "text" })
	description: string;

	@CreateDateColumn({ name: "created_at" })
	createdAt: Date;

	@UpdateDateColumn({ name: "updated_at" })
	updatedAt: Date;

	@OneToMany(
		() => Task,
		(task) => task.project,
	)
	tasks: Task[];

	@ManyToMany(
		() => User,
		(user) => user.projects,
	)
	users: User[];
}
