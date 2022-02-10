/* eslint-disable jest/no-conditional-expect */
import NetworkError from "../../errors/NetworkError";
import { setupServer } from "../../utils/test";
import SupabaseApiService from "../SupabaseApiService";

describe("getAll", () => {
    test("when successfully return response", async () => {
        const apiUrl = "http://localhost/api";
        const resourceName = "projects";
        const { closeServer } = setupServer({
            url: `${apiUrl}/rest/v1/${resourceName}`,
            response: [
                { id: 10, some_prop: "some value" },
                { id: 20, some_prop: "some value 2" },
            ],
            status: 200,
        });
        const service = new SupabaseApiService({
            url: apiUrl,
        });

        const response = await service.getAll(resourceName);

        expect(response.isRight()).toBe(true);
        expect(response.value).toEqual({
            data: [
                { id: 10, someProp: "some value" },
                { id: 20, someProp: "some value 2" },
            ],
            totalCount: 2,
        });

        closeServer();
    });

    test("when return response with an error", async () => {
        const apiUrl = "http://localhost/api";
        const resourceName = "projects";
        const STATUS_CODE = 404;
        const { closeServer } = setupServer({
            url: `${apiUrl}/rest/v1/${resourceName}`,
            response: {},
            status: STATUS_CODE,
        });
        const service = new SupabaseApiService({
            url: apiUrl,
        });

        const response = await service.getAll(resourceName);

        expect(response.isLeft()).toBe(true);
        expect(response.value).toBeInstanceOf(NetworkError);

        if (response.isLeft()) {
            expect(response.value.statusCode).toBe(STATUS_CODE);
        }

        closeServer();
    });
});

describe("get", () => {
    test("when successfully return response", async () => {
        const apiUrl = "http://localhost/api";
        const resourceName = "projects";
        const { closeServer } = setupServer({
            url: `${apiUrl}/rest/v1/${resourceName}`,
            response: { id: 10, some_prop: "some value" },
            status: 200,
        });
        const service = new SupabaseApiService({
            url: apiUrl,
        });

        const response = await service.get(resourceName, 10);

        expect(response.isRight()).toBe(true);
        expect(response.value).toEqual({ id: 10, someProp: "some value" });

        closeServer();
    });

    test("when return response with an error", async () => {
        const apiUrl = "http://localhost/api";
        const resourceName = "projects";
        const STATUS_CODE = 404;
        const { closeServer } = setupServer({
            url: `${apiUrl}/rest/v1/${resourceName}`,
            response: {},
            status: STATUS_CODE,
        });
        const service = new SupabaseApiService({
            url: apiUrl,
        });

        const response = await service.get(resourceName, 10);

        expect(response.isLeft()).toBe(true);
        expect(response.value).toBeInstanceOf(NetworkError);

        if (response.isLeft()) {
            expect(response.value.statusCode).toBe(STATUS_CODE);
        }

        closeServer();
    });
});

describe("update", () => {
    it("when successfully updated", async () => {
        const apiUrl = "http://localhost/api";
        const resourceName = "projects";
        const { closeServer } = setupServer({
            url: `${apiUrl}/rest/v1/${resourceName}`,
            method: "PATCH",
            response: {
                id: 1,
                some_prop: "new value",
            },
        });
        const service = new SupabaseApiService({
            url: apiUrl,
        });

        const response = await service.update(resourceName, 10, {
            someProp: "new value",
        });

        expect(response.isRight()).toBe(true);
        expect(response.value).toEqual({
            id: 1,
            someProp: "new value",
        });

        closeServer();
    });
});
