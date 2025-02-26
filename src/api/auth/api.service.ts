import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ApiKey } from "./api-key.entity";

@Injectable()
export class ApiService {
	constructor(
		@InjectRepository(ApiKey) private apiRepository: Repository<ApiKey>,
	) {}

	async findKey(key: string): Promise<ApiKey | null> {
		return this.apiRepository.findOne({ where: { id: key } });
	}
}
