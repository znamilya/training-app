import faker from "faker";

import { buildId } from "../../utils/ids";
import type { CategoryId } from "../category";
import type { TaskId, Task } from "../task";

export type ProjectId = string;

export type ProjectDto = {
    id: ProjectId;
    created_at: number;
    title: string;
    tasks: Task[];
    category?: CategoryId;
    is_active: boolean;
    is_completed: boolean;
};

export type Project = {
    id: ProjectId;
    createdAt: number;
    title: string;
    tasks: TaskId[];
    category?: CategoryId;
    isActive: boolean;
    isCompleted: boolean;
};

export const attachTask = (project: Project, taskId: TaskId): Project => ({
    ...project,
    tasks: [...project.tasks, taskId],
});

export const detachTask = (project: Project, taskId: TaskId): Project => ({
    ...project,
    tasks: project.tasks.filter((id) => id !== taskId),
});

export const generateTitle = (length: number = 5) =>
    faker.lorem.sentence(faker.datatype.number(length));

export const generateProject = (project: Partial<Project> = {}): Project => ({
    id: buildId(),
    createdAt: Date.now(),
    title: generateTitle(),
    tasks: [],
    isActive: false,
    isCompleted: false,
    ...project,
});
