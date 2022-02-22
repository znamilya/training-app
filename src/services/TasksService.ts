import { Either } from "@sweet-monads/either";

import { Task, TaskDto, TaskId } from "../enteties/task";
import TasksServiceError from "../errors/TaskServiceError";
import TaskServiceError from "../errors/TaskServiceError";

import { IRestApiService } from "./types";

type TasksServiceParams = {
    apiService: IRestApiService;
};

class TasksService {
    #apiService: IRestApiService;

    constructor({ apiService }: TasksServiceParams) {
        this.#apiService = apiService;
    }

    async fetchAll(): Promise<Either<TasksServiceError, { data: Task[]; totalCount: number }>> {
        const result = await this.#apiService.getAll<TaskDto, Task>("tasks", {
            match: {
                is_next_action: true,
            },
            orderBy: "created_at",
        });

        return result.mapLeft(
            (error) => new TasksServiceError("Can't load projects", error.statusCode),
        );
    }

    async insert(data: Partial<Task>): Promise<Either<TaskServiceError, Task>> {
        const result = await this.#apiService.insert<TaskDto, Task>("tasks", data);

        return result.mapLeft(
            (error) => new TasksServiceError("Can't create a task", error.statusCode),
        );
    }

    async update(taskId: TaskId, data: Partial<Task>): Promise<Either<TaskServiceError, Task>> {
        const result = await this.#apiService.update<TaskDto, Task>("tasks", taskId, data);

        return result.mapLeft(
            (error) => new TasksServiceError("Can't update a task", error.statusCode),
        );
    }

    async remove(taskId: TaskId): Promise<Either<TaskServiceError, Task>> {
        const result = await this.#apiService.remove<TaskDto, Task>("tasks", taskId);

        return result.mapLeft(
            (error) => new TasksServiceError("Can't remove a task", error.statusCode),
        );
    }
}

export default TasksService;
