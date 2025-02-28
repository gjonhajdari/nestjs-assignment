import { TestApp } from "./utils/test-utils";

describe("AppController (e2e)", () => {
	let testApp: TestApp;

	beforeEach(async () => {
		testApp = await TestApp.create();
	});

	afterEach(async () => {
		await testApp.close();
	});

	it("/ -> GET", () => {
		return testApp.getRequest().get("/").expect(200).expect("Hello World!");
	});
});
