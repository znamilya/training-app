import { schema } from "normalizr";
import { Optional } from "utility-types";

import type { ProjectId } from "../project/types";

export type TaskId = string;

export type Task = {
    id: TaskId;
    title: string;
    projectId?: ProjectId;
    isComplete: boolean;
    isNextAction: boolean;
};

export type TaskDto = {
    id: TaskId;
    title: string;
    project_id?: ProjectId;
    is_complete: boolean;
    is_next_action: boolean;
};

export const create = (task: Optional<Task, "isComplete" | "isNextAction">): Task => ({
    ...task,
    isComplete: false,
    isNextAction: false,
});

export const rename = (task: Task, title: string): Task => ({ ...task, title });

export const complete = (task: Task): Task => ({ ...task, isComplete: true });

export const incomplete = (task: Task): Task => ({ ...task, isComplete: false });

export const taskSchema = new schema.Entity<Task>(
    "tasks",
    {},
    {
        processStrategy: (task, project) => ({
            ...task,
            projectId: project.id,
        }),
    },
);

export const tasksSchema = new schema.Array(taskSchema);
