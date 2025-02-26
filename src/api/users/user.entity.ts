import {
	Column,
	Entity,
	JoinTable,
	ManyToMany,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Project } from "../projects/project.entity";
import { Task } from "../tasks/task.entity";

@Entity()
export class User {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ length: 40, name: "first_name" })
	firstName: string;

	@Column({ length: 40, name: "last_name" })
	lastName: string;

	@Column({ unique: true })
	email: string;

	@Column()
	location: string;

	@OneToMany(
		() => Task,
		(task) => task.user,
	)
	tasks: Task[];

	@ManyToMany(
		() => Project,
		(project) => project.users,
	)
	@JoinTable({
		name: "user_projects",
		joinColumn: {
			name: "user_id",
			referencedColumnName: "id",
		},
		inverseJoinColumn: {
			name: "project_id",
			referencedColumnName: "id",
		},
	})
	projects: Project[];
}
