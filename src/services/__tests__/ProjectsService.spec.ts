/* eslint-disable jest/no-conditional-expect */
import { createProject } from "../../enteties/project/factory";
import ProjectsServiceError from "../../errors/ProjectsServiceError";
import { setupServer } from "../../utils/test";
import SupabaseApiService from "../SupabaseApiService";
import ProjectsService from "../ProjectsService";

describe("fetchAll", () => {
    test("when successully return response", async () => {
        const apiUrl = "http://localhost/api";
        const RESPONSE = [createProject()];
        const { closeServer } = setupServer({
            url: `${apiUrl}/rest/v1/projects`,
            response: RESPONSE,
            status: 200,
        });
        const apiService = new SupabaseApiService({
            url: apiUrl,
        });
        const projectsService = new ProjectsService({ apiService });

        const response = await projectsService.fetchAll();

        expect(response.isRight()).toBe(true);
        expect(response.value).toEqual(RESPONSE);

        closeServer();
    });
    test("when return response with an error", async () => {
        const STATUS_CODE = 400;
        const apiUrl = "http://localhost/api";
        const { closeServer } = setupServer({
            url: `${apiUrl}/rest/v1/projects`,
            response: [],
            status: STATUS_CODE,
        });
        const apiService = new SupabaseApiService({
            url: apiUrl,
        });
        const projectsService = new ProjectsService({ apiService });

        const response = await projectsService.fetchAll();

        expect(response.isLeft()).toBe(true);
        expect(response.value).toBeInstanceOf(ProjectsServiceError);

        if (response.isLeft()) {
            expect(response.value.statusCode).toEqual(STATUS_CODE);
        }

        closeServer();
    });
});
