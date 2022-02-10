import { Either } from "@sweet-monads/either";

import { Task, TaskDto, TaskId } from "../enteties/task";
import TasksServiceError from "../errors/TaskServiceError";
import TaskServiceError from "../errors/TaskServiceError";

import { IRestApiService } from "./types";

type TasksServiceParams = {
    apiService: IRestApiService;
};

class TasksService {
    #apiSerice: IRestApiService;

    constructor({ apiService }: TasksServiceParams) {
        this.#apiSerice = apiService;
    }

    async insert(data: Partial<Task>): Promise<Either<TaskServiceError, Task>> {
        const result = await this.#apiSerice.insert<TaskDto, Task>("tasks", data);

        return result.mapLeft(
            (error) => new TasksServiceError("Can't create a task", error.statusCode),
        );
    }

    async update(taskId: TaskId, data: Partial<Task>): Promise<Either<TaskServiceError, Task>> {
        const result = await this.#apiSerice.update<TaskDto, Task>("tasks", taskId, data);

        return result.mapLeft(
            (error) => new TasksServiceError("Can't update a task", error.statusCode),
        );
    }

    async remove(taskId: TaskId): Promise<Either<TaskServiceError, Task>> {
        const result = await this.#apiSerice.remove<TaskDto, Task>("tasks", taskId);

        return result.mapLeft(
            (error) => new TasksServiceError("Can't remove a task", error.statusCode),
        );
    }
}

export default TasksService;
