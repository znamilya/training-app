import type { ProjectId } from "../project/types";

export type TaskId = number;

export type Task = {
    id: TaskId;
    title: string;
    isComplete: boolean;
    projectId: ProjectId;
};
