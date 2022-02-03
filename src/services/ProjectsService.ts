import { Either } from "@sweet-monads/either";

import { Project } from "../enteties/project/types";
import ProjectsServiceError from "../errors/ProjectsServiceError";

import ApiService from "./ApiService";

type ProjectsServiceParams = {
    apiService: ApiService;
};

class ProjectsService {
    #apiService: ApiService;

    constructor({ apiService }: ProjectsServiceParams) {
        this.#apiService = apiService;
    }

    async fetchAll(): Promise<Either<ProjectsServiceError, Project[]>> {
        const result = await this.#apiService.getAll<Project>("projects");

        return result.mapLeft(() => new ProjectsServiceError("Can't load projects"));
    }
}

export default ProjectsService;
