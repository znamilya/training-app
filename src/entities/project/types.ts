import type { CategoryId } from "../category/types";
import type { TaskId } from "../task/types";

export type ProjectId = string;

export type Project = {
    id: ProjectId;
    title: string;
    tasks: TaskId[];
    category: CategoryId;
};
