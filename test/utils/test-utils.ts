import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { ApiService } from "src/api/auth/api.service";
import { AppModule } from "src/app.module";
import { DataSource } from "typeorm";
import { authRequest } from "./helpers";

export class TestApp {
	app: INestApplication;
	apiKey: string;

	static async create(): Promise<TestApp> {
		const testApp = new TestApp();
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		testApp.app = moduleFixture.createNestApplication();
		await testApp.app.init();

		const dataSouce = testApp.app.get(DataSource);
		await dataSouce.synchronize(true);

		const apiService = moduleFixture.get<ApiService>(ApiService);
		const apiKey = await apiService.generateKey();
		testApp.apiKey = apiKey.id;

		return testApp;
	}

	getHttpServer() {
		return this.app.getHttpServer();
	}

	getRequest() {
		return authRequest(this.getHttpServer(), this.apiKey);
	}

	async close() {
		return this.app.close();
	}
}
