import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { schema as normalizr, normalize, NormalizedSchema } from "normalizr";

import { Project, ProjectId } from "../../../enteties/project/types";
import ProjectsService from "../../../services/ProjectsService";
import { EntityEnvelope } from "../../types";
import { schema } from "./schema";

const normalizeT = <T extends object>(data: T, schema: normalizr.Entity<T>) =>
    normalize<T, Record<string, Record<string, T>>, string>(data, schema);

export const create = createAsyncThunk<
    // NormalizedSchema<Project, ProjectId>,
    NormalizedSchema<Record<"projects", Record<ProjectId, EntityEnvelope<Project>>>, ProjectId>,
    { title: string; onSuccess?: () => void; onError?: () => void },
    {
        extra: {
            projectsService: ProjectsService;
        };
    }
>("projects/create", async ({ title, onSuccess, onError }, thunkApi) => {
    const { projectsService } = thunkApi.extra;

    const result = await projectsService.insert(title);

    if (result.isLeft()) {
        onError?.();
        throw result.value;
    }

    onSuccess?.();
    return normalize(result.value, schema);
});

export const remove = createAction<{ projectId: ProjectId }>("projects/remove");
export const rename = createAction<{ projectId: ProjectId; newTitle: string }>("projects/rename");
export const start = createAction<{ projectId: ProjectId }>("projects/start");
export const stop = createAction<{ projectId: ProjectId }>("projects/stop");
