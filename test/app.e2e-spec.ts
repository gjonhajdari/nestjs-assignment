import { INestApplication } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from "supertest";
import { App } from "supertest/types";
import { AuthGuard } from "../src/api/guards/auth.guard";
import { AppModule } from "./../src/app.module";
import { MockAuthGuard } from "./mocks/mock-auth.guard";

describe("AppController (e2e)", () => {
	let app: INestApplication<App>;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
			providers: [{ provide: APP_GUARD, useClass: MockAuthGuard }],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it("/ (GET)", () => {
		return request(app.getHttpServer())
			.get("/")
			.expect(200)
			.expect("Hello World!");
	});
});
