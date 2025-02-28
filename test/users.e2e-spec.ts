import { TestApp } from "./utils/test-utils";

describe("User endpoint", () => {
	let testApp: TestApp;

	beforeEach(async () => {
		testApp = await TestApp.create();
	});

	afterEach(async () => {
		await testApp.close();
	});

	it("/users/:userId -> GET", async () => {
		const user = await testApp.getRequest().post("/users/create").send({
			firstName: "test",
			lastName: "test",
			email: "test@test.com",
			location: "test",
		});

		return testApp
			.getRequest()
			.get(`/users/${user.body.id}`)
			.expect(200)
			.then((res) => {
				expect(res.body.id).toBeDefined();
			});
	});

	it("/users/:userId -> GET (Invalid UUID)", async () => {
		await testApp.getRequest().post("/users/create").send({
			firstName: "test",
			lastName: "test",
			email: "test@test.com",
			location: "test",
		});

		return testApp.getRequest().get("/users/1").expect(400);
	});

	it("/users/:userId -> GET (User not found)", async () => {
		await testApp.getRequest().post("/users/create").send({
			firstName: "test",
			lastName: "test",
			email: "test@test.com",
			location: "test",
		});

		await testApp.getRequest().get("/users/bdef8e07-e4f0-41dc-85ff-7b4b367f5f67").expect(404);
	});

	it("/users/create -> POST", async () => {
		return testApp
			.getRequest()
			.post("/users/create")
			.send({
				firstName: "test",
				lastName: "test",
				email: "test@test.com",
				location: "test",
			})
			.expect(201)
			.then((res) => {
				const { firstName, lastName, email, location } = res.body;
				expect(firstName).toEqual("test");
				expect(lastName).toEqual("test");
				expect(email).toEqual("test@test.com");
				expect(location).toEqual("test");
			});
	});

	it("/users/create -> POST (Invalid email)", async () => {
		return testApp
			.getRequest()
			.post("/users/create")
			.send({
				firstName: "test",
				lastName: "test",
				email: "test",
				location: "test",
			})
			.expect(400);
	});

	it("/users/create -> POST (Email already taken)", async () => {
		await testApp
			.getRequest()
			.post("/users/create")
			.send({
				firstName: "test",
				lastName: "test",
				email: "test@test.com",
				location: "test",
			})
			.expect(201);

		return testApp
			.getRequest()
			.post("/users/create")
			.send({
				firstName: "test2",
				lastName: "test2",
				email: "test@test.com",
				location: "test2",
			})
			.expect(400);
	});

	it("/:userId -> PATCH", async () => {
		const { body: user } = await testApp.getRequest().post("/users/create").send({
			firstName: "test",
			lastName: "test",
			email: "test@test.com",
			location: "test",
		});

		return testApp
			.getRequest()
			.patch(`/users/${user.id}`)
			.send({ email: "test2@test.com" })
			.expect(200)
			.then((res) => {
				expect(res.body.email).toEqual("test2@test.com");
			});
	});

	it("/:userId -> PATCH (Email already taken)", async () => {
		await testApp.getRequest().post("/users/create").send({
			firstName: "test",
			lastName: "test",
			email: "test@test.com",
			location: "test",
		});

		const { body: user } = await testApp.getRequest().post("/users/create").send({
			firstName: "test",
			lastName: "test",
			email: "test2@test.com",
			location: "test",
		});

		return testApp
			.getRequest()
			.patch(`/users/${user.id}`)
			.send({ email: "test@test.com" })
			.expect(400);
	});

	it("/:userId -> DELETE", async () => {
		const { body: user } = await testApp.getRequest().post("/users/create").send({
			firstName: "test",
			lastName: "test",
			email: "test@test.com",
			location: "test",
		});

		await testApp.getRequest().delete(`/users/${user.id}`).expect(200);
		await testApp.getRequest().get(`/users/${user.id}`).expect(404);
	});

	it("/:userId -> DELETE (User not found)", async () => {
		const { body: user } = await testApp.getRequest().post("/users/create").send({
			firstName: "test",
			lastName: "test",
			email: "test@test.com",
			location: "test",
		});

		await testApp.getRequest().delete(`/users/${user.id}`).expect(200);
		await testApp.getRequest().delete(`/users/${user.id}`).expect(404);
	});
});
