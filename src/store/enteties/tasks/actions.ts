import { createAction, nanoid } from "@reduxjs/toolkit";
import { ProjectId } from "../../../entities/project/types";

import { TaskId } from "../../../entities/task/types";

export const create = createAction(
    "tasks/create",
    ({ projectId, title }: { projectId?: ProjectId; title: string }) => ({
        payload: {
            id: nanoid(),
            title,
            projectId,
        },
    }),
);
export const schedule = createAction<TaskId>("tasks/schedule");
export const unschedule = createAction<TaskId>("tasks/unschedule");
export const complete = createAction<TaskId>("tasks/complete");
export const uncomplete = createAction<TaskId>("tasks/uncomplete");
