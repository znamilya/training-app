import { createAsyncThunk } from "@reduxjs/toolkit";
import { schema as normalizr, normalize, NormalizedSchema } from "normalizr";

import { Project, ProjectId } from "../../../enteties/project/types";
import ProjectsService from "../../../services/ProjectsService";
import { schemas } from "../../entities/projects";
import { RootState } from "../../store";

const normalizeT = <T extends object>(data: T[], schemas: normalizr.Array<T>) =>
    normalize<T, Record<string, Record<string, T>>, string[]>(data, schemas);

export const load = createAsyncThunk<
    NormalizedSchema<Record<"projects", Record<ProjectId, Project>>, ProjectId[]> & {
        totalCount: number;
    },
    void,
    {
        extra: {
            projectsService: ProjectsService;
        };
    }
>(
    "allActiveProjects/fetch",
    async (_arg, { extra }) => {
        const result = await extra.projectsService.fetchAllActive();

        if (result.isLeft()) {
            throw result.value;
        }

        const { data, totalCount } = result.value;

        return { ...normalizeT(data, schemas), totalCount };
    },
    {
        condition: (_, { getState }) => {
            const state = getState() as RootState;
            const isStale = state.collections.allProjects.isStale;

            return isStale;
        },
    },
);
