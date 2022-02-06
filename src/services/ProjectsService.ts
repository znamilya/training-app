import { Either } from "@sweet-monads/either";

import { Project, ProjectId } from "../enteties/project/types";
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

    async fetchAll(): Promise<
        Either<ProjectsServiceError, { data: Project[]; totalCount: number }>
    > {
        const result = await this.#apiService.getAll<Project>("projects");

        return result.mapLeft(
            (error) => new ProjectsServiceError("Can't load projects", error.statusCode),
        );
    }

    async fetch(projectId: ProjectId): Promise<Either<ProjectsServiceError, Project>> {
        const result = await this.#apiService.getById<Project>("projects", projectId);

        return result.mapLeft(
            (error) => new ProjectsServiceError("Can't load project", error.statusCode),
        );
    }

    async insert(title: string): Promise<Either<ProjectsServiceError, Project>> {
        const result = await this.#apiService.insert<Project>("projects", {
            title,
            tasks: [],
        });

        return result.mapLeft(
            (error) => new ProjectsServiceError("Can't create project", error.statusCode),
        );
    }

    async remove(projectId: ProjectId): Promise<Either<ProjectsServiceError, Project>> {
        const result = await this.#apiService.remove<Project>("projects", projectId);

        return result.mapLeft(
            (error) => new ProjectsServiceError("Can't remove project", error.statusCode),
        );
    }
}

export default ProjectsService;
