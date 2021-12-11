import type { ProjectId } from "../project/types";

export type TaskId = string;

export type Task = {
    id: TaskId;
    title: string;
} & (
    | {
          isInbox: false; // descriminant
          projectId: ProjectId;
          isComplete: boolean;
          isNextAction: boolean;
      }
    | {
          isInbox: true; // descriminant
          projectId: undefined;
          isComplete: false;
          isNextAction: false;
      }
);
