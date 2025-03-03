import { BadRequestException, NotFoundException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommonModule } from "src/common/common.module";
import { config } from "src/config/data-source.config";
import { DataSource, DataSourceOptions } from "typeorm";
import { User } from "./user.entity";
import { UsersService } from "./users.service";

describe("Users service", () => {
	let service: UsersService;
	let dataSource: DataSource;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				TypeOrmModule.forRoot(config as DataSourceOptions),
				TypeOrmModule.forFeature([User]),
				CommonModule,
			],
			providers: [UsersService],
		}).compile();

		dataSource = module.get<DataSource>(DataSource);
		await dataSource.synchronize(true);

		service = module.get<UsersService>(UsersService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	it("should create a user", async () => {
		const user = await service.createUser({
			firstName: "test",
			lastName: "test",
			email: "test@test.com",
			location: "test",
		});

		expect(user).toBeDefined();
		expect(user.firstName).toEqual("test");
		expect(user.lastName).toEqual("test");
		expect(user.email).toEqual("test@test.com");
		expect(user.location).toEqual("test");
	});

	it("should throw if trying to create a user with an email that's already taken", async () => {
		await service.createUser({
			firstName: "test",
			lastName: "test",
			email: "test@test.com",
			location: "test",
		});

		expect(
			service.createUser({
				firstName: "test2",
				lastName: "test2",
				email: "test@test.com",
				location: "test2",
			}),
		).rejects.toThrow(BadRequestException);
	});

	it("should find a user from their ID", async () => {
		const user = await service.createUser({
			firstName: "test",
			lastName: "test",
			email: "test@test.com",
			location: "test",
		});

		const foundUser = await service.findById(user.id);

		expect(foundUser).toBeDefined();
		expect(foundUser.firstName).toEqual("test");
		expect(foundUser.lastName).toEqual("test");
		expect(foundUser.email).toEqual("test@test.com");
		expect(foundUser.location).toEqual("test");
	});

	it("should throw if a user with given ID doesn't exist", async () => {
		await service.createUser({
			firstName: "test",
			lastName: "test",
			email: "test@test.com",
			location: "test",
		});

		expect(service.findById("1")).rejects.toThrow(NotFoundException);
	});

	it("should find a user from their email", async () => {
		await service.createUser({
			firstName: "test",
			lastName: "test",
			email: "test@test.com",
			location: "test",
		});

		const foundUser = await service.findByEmail("test@test.com");
		expect(foundUser).toBeDefined();
		expect(foundUser?.firstName).toEqual("test");
		expect(foundUser?.lastName).toEqual("test");
		expect(foundUser?.email).toEqual("test@test.com");
		expect(foundUser?.location).toEqual("test");
	});

	it("should return null if a user with the given email isn't found (Specified)", async () => {
		await service.createUser({
			firstName: "test",
			lastName: "test",
			email: "test@test.com",
			location: "test",
		});

		const foundUser = await service.findByEmail("test2@test.com");
		expect(foundUser).toBeNull();
	});

	it("should throw if a user with the given email isn't found (Specified)", async () => {
		await service.createUser({
			firstName: "test",
			lastName: "test",
			email: "test@test.com",
			location: "test",
		});

		expect(service.findByEmail("test2@test.com", true)).rejects.toThrow(NotFoundException);
	});

	it("should update user with new values", async () => {
		const user = await service.createUser({
			firstName: "test",
			lastName: "test",
			email: "test@test.com",
			location: "test",
		});

		const updatedUser = await service.updateUser(user.id, {
			firstName: "test2",
			lastName: "test2",
			email: "test2@test.com",
			location: "test2",
		});

		expect(updatedUser).toBeDefined();
		expect(updatedUser.firstName).toEqual("test2");
		expect(updatedUser.lastName).toEqual("test2");
		expect(updatedUser.email).toEqual("test2@test.com");
		expect(updatedUser.location).toEqual("test2");
	});

	it("should throw if trying to update a user that doesn't exist", async () => {
		const user = await service.createUser({
			firstName: "test",
			lastName: "test",
			email: "test2@test.com",
			location: "test",
		});

		expect(service.updateUser("user.id", { email: "test2@test.com" })).rejects.toThrow(
			NotFoundException,
		);
	});

	it("should throw if trying to update user with an email that's already taken", async () => {
		await service.createUser({
			firstName: "test",
			lastName: "test",
			email: "test@test.com",
			location: "test",
		});

		const user = await service.createUser({
			firstName: "test",
			lastName: "test",
			email: "test2@test.com",
			location: "test",
		});

		expect(service.updateUser(user.id, { email: "test@test.com" })).rejects.toThrow(
			BadRequestException,
		);
	});

	it("should delete user with the given ID", async () => {
		const user = await service.createUser({
			firstName: "test",
			lastName: "test",
			email: "test2@test.com",
			location: "test",
		});

		await service.deleteUser(user.id);
		expect(service.findById(user.id)).rejects.toThrow(NotFoundException);
	});

	it("should throw if trying to delete a user that's already been deleted", async () => {
		const user = await service.createUser({
			firstName: "test",
			lastName: "test",
			email: "test2@test.com",
			location: "test",
		});

		await service.deleteUser(user.id);
		expect(service.deleteUser(user.id)).rejects.toThrow(NotFoundException);
	});
});
