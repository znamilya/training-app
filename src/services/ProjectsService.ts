import { Either } from "@sweet-monads/either";

import { Project } from "../enteties/project/types";
import ProjectsServiceError from "../errors/ProjectsServiceError";

import { IApiService } from "./types";

type ProjectsServiceParams = {
    apiService: IApiService;
};

class ProjectsService {
    #apiService: IApiService;

    constructor({ apiService }: ProjectsServiceParams) {
        this.#apiService = apiService;
    }

    async fetchAll(): Promise<Either<ProjectsServiceError, Project[]>> {
        const result = await this.#apiService.getAll<Project>("projects");

        return result.mapLeft(
            (error) => new ProjectsServiceError("Can't load projects", error.statusCode),
        );
    }

    async insert(title: string): Promise<Either<ProjectsServiceError, Project>> {
        const result = await this.#apiService.insert<Project>("projects", {
            title,
            tasks: [],
            // isActive: false,
        });

        return result.mapLeft(
            (error) => new ProjectsServiceError("Can't create project", error.statusCode),
        );
    }
}

export default ProjectsService;
