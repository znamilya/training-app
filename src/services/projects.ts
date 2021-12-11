import { normalize, NormalizedSchema } from "normalizr";

import { ProjectDto, Project, ProjectId } from "../enteties/project/types";
import { projectsSchema } from "../enteties/project";

const fakeProjects: ProjectDto[] = [
    {
        id: "wEAzXnucDQLCrnr9Nr38_",
        title: "Read a book",
        tasks: [
            {
                id: "1",
                title: "Chapter 1",
                isNextAction: false,
                isComplete: true,
            },
            {
                id: "2",
                title: "Chapter 2",
                isNextAction: false,
                isComplete: false,
            },
        ],
        isActive: false,
    },
    {
        id: "7OjTMXSSxRJYaCDQV9vju",
        title: "Watch a course",
        tasks: [
            {
                id: "10",
                title: "Watch lecture 1",
                isNextAction: false,
                isComplete: true,
            },
            {
                id: "12",
                title: "Watch lecture 2",
                isNextAction: false,
                isComplete: true,
            },
            {
                id: "13",
                title: "Watch lecture 3",
                isNextAction: false,
                isComplete: false,
            },
            {
                id: "14",
                title: "Watch lecture 4",
                isNextAction: false,
                isComplete: false,
            },
        ],
        isActive: false,
    },
];

export const getAllProjects = async (): Promise<
    NormalizedSchema<{ projects: Record<ProjectId, Project> }, ProjectId[]>
> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const s = normalize<Project, { projects: Record<ProjectId, Project> }, ProjectId[]>(
                fakeProjects,
                projectsSchema,
            );

            resolve(s);
        }, 1000);
    });
};

export const getProjectById = async (projectId: ProjectId): Promise<Project> => {
    return Promise.resolve({
        id: "7OjTMXSSxRJYaCDQV9vju",
        title: "Watch a course",
        tasks: [],
        isActive: false,
    });
};
