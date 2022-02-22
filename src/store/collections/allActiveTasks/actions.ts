import { createAsyncThunk } from "@reduxjs/toolkit";
import { schema as normalizr, normalize, NormalizedSchema } from "normalizr";

import { Task, TaskId } from "../../../enteties/task";
import { schemas } from "../../entities/projects";
import TasksService from "../../../services/TasksService";
import { RootState } from "../../store";

const normalizeT = <T extends object>(data: T[], schemas: normalizr.Array<T>) =>
    normalize<T, Record<string, Record<string, T>>, string[]>(data, schemas);

export const load = createAsyncThunk<
    NormalizedSchema<Record<"tasks", Record<TaskId, Task>>, TaskId[]> & {
        totalCount: number;
    },
    void,
    {
        extra: {
            tasksService: TasksService;
        };
    }
>(
    "allActiveTasks/fetch",
    async (_arg, { extra }) => {
        const result = await extra.tasksService.fetchAll();

        if (result.isLeft()) {
            throw result.value;
        }

        const { data, totalCount } = result.value;

        return { ...normalizeT(data, schemas), totalCount };
    },
    {
        condition: (_, { getState }) => {
            const state = getState() as RootState;
            const isStale = state.collections.allActiveTasks.isStale;

            return isStale;
        },
    },
);
