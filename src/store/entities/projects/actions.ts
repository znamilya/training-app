import { createAction } from "@reduxjs/toolkit";
import { normalize } from "normalizr";

import { ProjectId } from "../../../enteties/project/types";
import ProjectsService from "../../../services/ProjectsService";
import { schema } from "./schema";
import { NormalizedReponse } from "./types";
import { createAsyncThunk } from "../../utils";

type FetchParams = { projectId: ProjectId };

export const fetch = createAsyncThunk<NormalizedReponse, FetchParams>(
    "projects/fetch",
    async ({ projectId }, { extra: { projectsService } }) => {
        const result = await projectsService.fetch(projectId);

        if (result.isLeft()) {
            throw result.value;
        }

        return normalize(result.value, schema);
    },
);

type CreateParams = {
    title: string;
};

export const create = createAsyncThunk<NormalizedReponse, CreateParams>(
    "projects/create",
    async ({ title }, thunkApi) => {
        const { projectsService } = thunkApi.extra;

        const result = await projectsService.insert(title);

        if (result.isLeft()) {
            throw result.value;
        }

        return normalize(result.value, schema);
    },
);

export const remove = createAsyncThunk<NormalizedReponse, { projectId: ProjectId }>(
    "projects/remove",
    async ({ projectId }, thunkApi) => {
        const { projectsService } = thunkApi.extra;

        const result = await projectsService.remove(projectId);

        if (result.isLeft()) {
            throw result.value;
        }

        return normalize(result.value, schema);
    },
);

export const rename = createAction<{ projectId: ProjectId; newTitle: string }>("projects/rename");
export const start = createAction<{ projectId: ProjectId }>("projects/start");
export const stop = createAction<{ projectId: ProjectId }>("projects/stop");
