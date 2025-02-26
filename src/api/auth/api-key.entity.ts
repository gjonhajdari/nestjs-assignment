import * as crypto from "node:crypto";
import {
	BeforeInsert,
	Column,
	Entity,
	PrimaryColumn,
	PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class ApiKey {
	@PrimaryColumn("varchar", { length: 40 })
	id: string;

	@Column({ default: true })
	active: boolean;

	@BeforeInsert()
	setId() {
		this.id = crypto
			.randomBytes(120)
			.toString("base64")
			.replace(/[^a-zA-Z0-9]/g, "");
	}
}
