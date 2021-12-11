import { generateProject } from "../enteties/project/types";

const fakeProjects = [generateProject(), generateProject(), generateProject()];

export const request = (path: string) => {
    return Promise.resolve(fakeProjects);
};
