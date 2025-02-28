import * as request from "supertest";

export const authRequest = (server, key) => {
	return {
		get: (url) => request(server).get(url).set("x-api-key", key),
		post: (url) => request(server).post(url).set("x-api-key", key),
		patch: (url) => request(server).patch(url).set("x-api-key", key),
		delete: (url) => request(server).delete(url).set("x-api-key", key),
	};
};
