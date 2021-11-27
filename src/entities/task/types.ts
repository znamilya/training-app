import type { ProjectId } from "../project/types";

export type TaskId = string;

export type Task = {
    id: TaskId;
    title: string;
    isComplete: boolean;
    projectId: ProjectId;
};
