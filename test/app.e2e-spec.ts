import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from "supertest";
import { App } from "supertest/types";
import { DataSource } from "typeorm";
import { AppModule } from "./../src/app.module";

describe("AppController (e2e)", () => {
	let app: INestApplication<App>;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();

		const dataSouce = app.get(DataSource);
		await dataSouce.synchronize(true);
	});

	afterEach(async () => {
		await app.close();
	});

		return request(app.getHttpServer())
			.get("/")
			.expect(200)
			.expect("Hello World!");
	});
});
