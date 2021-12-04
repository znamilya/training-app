import type { ProjectId } from "../project/types";

export type TaskId = string;

export type Task = {
    id: TaskId;
    title: string;
    projectId?: ProjectId;
    isComplete: boolean;
    isInbox: boolean;
    isNextAction: boolean;
};
