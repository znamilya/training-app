import { createAction } from "@reduxjs/toolkit";
import { normalize, NormalizedSchema } from "normalizr";

import { ProjectId } from "../../../enteties/project/types";
import { Task, TaskId } from "../../../enteties/task";
import { RootState } from "../../store";
import { EntityEnvelope } from "../../types";
import { createAsyncThunk } from "../../utils";

import { schema } from "./schema";
import { selectById } from "./selectors";

export type CreateParams = {
    projectId: ProjectId;
    title: string;
};

export const create = createAsyncThunk<
    NormalizedSchema<Record<"tasks", Record<ProjectId, EntityEnvelope<Task>>>, TaskId>,
    CreateParams
>("tasks/create", async (data, { extra }) => {
    const { tasksService } = extra;
    const result = await tasksService.insert(data);

    if (result.isLeft()) {
        throw result.value;
    }

    return normalize(result.value, schema);
});

export const remove = createAsyncThunk<
    NormalizedSchema<Record<"tasks", Record<ProjectId, EntityEnvelope<Task>>>, TaskId>,
    TaskId
>("tasks/remove", async (taskId, { extra }) => {
    const { tasksService } = extra;
    const result = await tasksService.remove(taskId);

    if (result.isLeft()) {
        throw result.value;
    }

    return normalize(result.value, schema);
});

export const complete = createAsyncThunk<
    NormalizedSchema<Record<"tasks", Record<ProjectId, EntityEnvelope<Task>>>, TaskId>,
    { taskId: TaskId }
>("tasks/complete", async ({ taskId }, { getState, extra }) => {
    const { tasksService } = extra;
    const state = getState() as RootState;
    const task = selectById(taskId)(state);

    if (!task?.data) {
        throw new Error(`Unknonwn task: ${taskId}`);
    }

    const result = await tasksService.update(taskId, {
        // TODO: Move this logic to backend
        isComplete: !task.data.isComplete,
    });

    if (result.isLeft()) {
        throw result.value;
    }

    return normalize(result.value, schema);
});

export const rename = createAction<{ taskId: TaskId; newTitle: string }>("tasks/rename");
export const schedule = createAction<TaskId>("tasks/schedule");
export const unschedule = createAction<TaskId>("tasks/unschedule");
