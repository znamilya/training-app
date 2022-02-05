/* eslint-disable jest/no-conditional-expect */
import NetworkError from "../../errors/NetworkError";
import { setupServer } from "../../utils/test";
import SupabaseApiService from "../SupabaseApiService";

describe("getAll", () => {
    test("when successully return response", async () => {
        const RESPONSE = { x: 10 };
        const apiUrl = "http://localhost/api";
        const resourceName = "projects";
        const { closeServer } = setupServer({
            url: `${apiUrl}/rest/v1/${resourceName}`,
            response: RESPONSE,
            status: 200,
        });

        const service = new SupabaseApiService({
            url: apiUrl,
        });

        const response = await service.getAll(resourceName);

        expect(response.isRight()).toBe(true);
        expect(response.value).toEqual(RESPONSE);

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

describe("getById", () => {
    test("when successully return response", async () => {
        const apiUrl = "http://localhost/api";
        const RESPONSE = { x: 10 };
        const resourceName = "projects";
        const id = 10;
        const { closeServer } = setupServer({
            url: `${apiUrl}/${resourceName}/${id}`,
            response: RESPONSE,
            status: 200,
        });

        const service = new SupabaseApiService({
            url: apiUrl,
        });
        const response = await service.getById(resourceName, id);

        expect(response.isRight()).toBe(true);
        expect(response.value).toEqual(RESPONSE);

        closeServer();
    });

    test("when return response with an error", async () => {
        const apiUrl = "http://localhost/api";
        const resourceName = "projects";
        const STATUS_CODE = 404;
        const id = 10;
        const { closeServer } = setupServer({
            url: `${apiUrl}/${resourceName}/${id}`,
            response: {},
            status: STATUS_CODE,
        });

        const service = new SupabaseApiService({
            url: apiUrl,
        });
        const response = await service.getById(resourceName, id);

        expect(response.isLeft()).toBe(true);
        expect(response.value).toBeInstanceOf(NetworkError);

        if (response.isLeft()) {
            expect(response.value.statusCode).toBe(STATUS_CODE);
        }

        closeServer();
    });
});
