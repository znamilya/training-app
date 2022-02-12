import { createAction } from "@reduxjs/toolkit";
import { normalize, NormalizedSchema } from "normalizr";

import { Project, ProjectId } from "../../../enteties/project/types";
import { EntityEnvelope } from "../../types";
import { createAsyncThunk } from "../../utils";

import { schema } from "./schema";

export const fetch = createAsyncThunk<
    NormalizedSchema<Record<"projects", Record<ProjectId, EntityEnvelope<Project>>>, ProjectId>,
    { projectId: ProjectId }
>("projects/fetch", async ({ projectId }, { extra: { projectsService } }) => {
    const result = await projectsService.fetch(projectId);

    if (result.isLeft()) {
        throw result.value;
    }

    return normalize(result.value, schema);
});

type CreateParams = {
    title: string;
};

export const create = createAsyncThunk<
    NormalizedSchema<Record<"projects", Record<ProjectId, EntityEnvelope<Project>>>, ProjectId>,
    CreateParams
>("projects/create", async ({ title }, thunkApi) => {
    const { projectsService } = thunkApi.extra;

    const result = await projectsService.insert(title);

    if (result.isLeft()) {
        throw result.value;
    }

    return normalize(result.value, schema);
});

export const remove = createAsyncThunk<
    NormalizedSchema<Record<"projects", Record<ProjectId, EntityEnvelope<Project>>>, ProjectId>,
    { projectId: ProjectId }
>("projects/remove", async ({ projectId }, thunkApi) => {
    const { projectsService } = thunkApi.extra;

    const result = await projectsService.remove(projectId);

    if (result.isLeft()) {
        throw result.value;
    }

    return normalize(result.value, schema);
});

export const rename = createAsyncThunk<
    NormalizedSchema<Record<"projects", Record<ProjectId, EntityEnvelope<Project>>>, ProjectId>,
    { projectId: ProjectId; newTitle: string }
>("projects/rename", async ({ projectId, newTitle }, thunkApi) => {
    const { projectsService } = thunkApi.extra;

    const result = await projectsService.update(projectId, {
        title: newTitle,
    });

    if (result.isLeft()) {
        throw result.value;
    }

    return normalize(result.value, schema);
});

export const start = createAsyncThunk<
    NormalizedSchema<Record<"projects", Record<ProjectId, EntityEnvelope<Project>>>, ProjectId>,
    { projectId: ProjectId }
>("projects/start", async ({ projectId }, thunkApi) => {
    const { projectsService } = thunkApi.extra;

    const result = await projectsService.update(projectId, {
        isActive: true,
    });

    if (result.isLeft()) {
        throw result.value;
    }

    return normalize(result.value, schema);
});

export const stop = createAsyncThunk<
    NormalizedSchema<Record<"projects", Record<ProjectId, EntityEnvelope<Project>>>, ProjectId>,
    { projectId: ProjectId }
>("projects/stop", async ({ projectId }, thunkApi) => {
    const { projectsService } = thunkApi.extra;

    const result = await projectsService.update(projectId, {
        isActive: false,
    });

    if (result.isLeft()) {
        throw result.value;
    }

    return normalize(result.value, schema);
});

export const complete = createAsyncThunk<
    NormalizedSchema<Record<"projects", Record<ProjectId, EntityEnvelope<Project>>>, ProjectId>,
    { projectId: ProjectId }
>("projects/complete", async ({ projectId }, thunkApi) => {
    const { projectsService } = thunkApi.extra;

    const result = await projectsService.update(projectId, {
        isCompleted: true,
        isActive: false,
    });

    if (result.isLeft()) {
        throw result.value;
    }

    return normalize(result.value, schema);
});
