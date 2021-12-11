import { createAction, nanoid } from "@reduxjs/toolkit";
import type { Optional } from "utility-types";

import { ProjectId } from "../../../entities/project/types";
import { Task, TaskId } from "../../../entities/task/types";

export const create = createAction(
    "tasks/create",
    (task: Optional<Task, "id" | "isComplete" | "isInbox" | "isNextAction">) => ({
        payload: {
            id: nanoid(),
            ...task,
        },
    }),
);
export const remove = createAction<{ taskId: TaskId; projectId?: ProjectId }>("tasks/remove");
export const rename = createAction<{ taskId: TaskId; newTitle: string }>("tasks/rename");
export const schedule = createAction<TaskId>("tasks/schedule");
export const unschedule = createAction<TaskId>("tasks/unschedule");
export const complete = createAction<TaskId>("tasks/complete");
export const uncomplete = createAction<TaskId>("tasks/uncomplete");
