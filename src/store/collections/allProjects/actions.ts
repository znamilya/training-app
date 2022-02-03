import { createAsyncThunk } from "@reduxjs/toolkit";
import { schema as normalizr, normalize, NormalizedSchema } from "normalizr";

import { Project, ProjectId } from "../../../enteties/project/types";
import ProjectsService from "../../../services/ProjectsService";
import { schemas } from "../../entities/projects";

const normalizeT = <T extends object>(data: T[], schemas: normalizr.Array<T>) =>
    normalize<T, Record<string, Record<string, T>>, string[]>(data, schemas);

export const load = createAsyncThunk<
    NormalizedSchema<Record<"projects", Record<ProjectId, Project>>, ProjectId[]>,
    void,
    {
        extra: {
            projectsService: ProjectsService;
        };
    }
>("allProjects/fetch", async (_arg, thunkApi) => {
    const { projectsService } = thunkApi.extra;

    const result = await projectsService.fetchAll();

    if (result.isLeft()) {
        throw result.value;
    }

    return normalizeT(result.value, schemas);
});
