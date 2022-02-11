import { Either } from "@sweet-monads/either";

import { Project, ProjectDto, ProjectId } from "../enteties/project/types";
import ProjectsServiceError from "../errors/ProjectsServiceError";

import { IRestApiService } from "./types";

type ProjectsServiceParams = {
    apiService: IRestApiService;
};

class ProjectsService {
    #apiService: IRestApiService;

    constructor({ apiService }: ProjectsServiceParams) {
        this.#apiService = apiService;
    }

    async fetchAll(): Promise<
        Either<ProjectsServiceError, { data: Project[]; totalCount: number }>
    > {
        const result = await this.#apiService.getAll<ProjectDto, Project>("projects", {
            embed: [{ name: "tasks", orderBy: "create_at" }],
            match: {
                is_completed: false,
            },
            orderBy: "created_at",
        });

        return result.mapLeft(
            (error) => new ProjectsServiceError("Can't load projects", error.statusCode),
        );
    }

    async fetchAllActive(): Promise<
        Either<ProjectsServiceError, { data: Project[]; totalCount: number }>
    > {
        const result = await this.#apiService.getAll<ProjectDto, Project>("projects", {
            embed: [{ name: "tasks", orderBy: "created_at" }],
            match: {
                is_active: true,
            },
            orderBy: "created_at",
        });

        return result.mapLeft(
            (error) => new ProjectsServiceError("Can't load active projects", error.statusCode),
        );
    }

    async fetchAllCompleted(): Promise<
        Either<ProjectsServiceError, { data: Project[]; totalCount: number }>
    > {
        const result = await this.#apiService.getAll<ProjectDto, Project>("projects", {
            embed: [{ name: "tasks", orderBy: "created_at" }],
            match: {
                is_completed: true,
            },
            orderBy: "created_at",
        });

        return result.mapLeft(
            (error) => new ProjectsServiceError("Can't load completed projects", error.statusCode),
        );
    }

    async fetch(projectId: ProjectId): Promise<Either<ProjectsServiceError, Project>> {
        const result = await this.#apiService.get<ProjectDto, Project>("projects", projectId, {
            embed: [{ name: "tasks", orderBy: "created_at" }],
        });

        return result.mapLeft(
            (error) => new ProjectsServiceError("Can't load project", error.statusCode),
        );
    }

    async insert(title: string): Promise<Either<ProjectsServiceError, Project>> {
        const result = await this.#apiService.insert<ProjectDto, Project>("projects", {
            title,
            tasks: [],
        });

        return result.mapLeft(
            (error) => new ProjectsServiceError("Can't create project", error.statusCode),
        );
    }

    async remove(projectId: ProjectId): Promise<Either<ProjectsServiceError, Project>> {
        const result = await this.#apiService.remove<ProjectDto, Project>("projects", projectId);

        return result.mapLeft(
            (error) => new ProjectsServiceError("Can't remove project", error.statusCode),
        );
    }

    async update(
        projectId: ProjectId,
        data: Partial<Project>,
    ): Promise<Either<ProjectsServiceError, Project>> {
        const result = await this.#apiService.update<ProjectDto, Project>(
            "projects",
            projectId,
            data,
        );

        return result.mapLeft(
            (error) => new ProjectsServiceError("Can't update project", error.statusCode),
        );
    }
}

export default ProjectsService;
