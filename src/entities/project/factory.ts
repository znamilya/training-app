import { buildId } from "../../utils/ids";
import faker from "faker";

import { Project } from "./types";

export const generateProjectTitle = (length: number = 5) =>
    faker.lorem.sentence(faker.datatype.number(length));

export const createProject = (project: Partial<Project>): Project => ({
    id: buildId(),
    title: generateProjectTitle(),
    tasks: [],
    isActive: false,
    ...project,
});
