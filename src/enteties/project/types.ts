import faker from "faker";

import { buildId } from "../../utils/ids";
import type { CategoryId } from "../category";
import type { TaskId, Task } from "../task";

export type ProjectId = string;

export type ProjectDto = {
    id: ProjectId;
    title: string;
    tasks: Task[];
    category?: CategoryId;
    isActive: boolean;
};

export type Project = {
    id: ProjectId;
    title: string;
    tasks: TaskId[];
    category?: CategoryId;
    isActive: boolean;
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
    title: generateTitle(),
    tasks: [],
    isActive: false,
    ...project,
});
