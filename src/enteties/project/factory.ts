import { buildId } from "../../utils/ids";
import faker from "faker";

import { Project } from "./types";

export const generateProjectTitle = (length: number = 5) =>
    faker.lorem.sentence(faker.datatype.number({ min: 3, max: 7 }));

export const createProject = (project: Partial<Project> = {}): Project => ({
    id: buildId(),
    createdAt: Date.now(),
    title: generateProjectTitle(),
    tasks: [],
    isActive: false,
    isCompleted: false,
    ...project,
});
