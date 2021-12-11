import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { schema as normalizr, normalize, NormalizedSchema } from "normalizr";

import { Project, ProjectId } from "../../../enteties/project/types";
import { schemas } from "../../entities/projects";

const normalizeT = <T extends object>(data: T[], schemas: normalizr.Array<T>) =>
    normalize<T, Record<string, Record<string, T>>, string[]>(data, schemas);

export const load = createAsyncThunk<
    NormalizedSchema<Record<"projects", Record<ProjectId, Project>>, ProjectId[]>
>("allProjects/fetch", async () => {
    try {
        const response = await axios.get<Project[]>(
            "https://mrdone.free.beeceptor.com/api/v1/projects",
        );

        console.log(typeof response.data);

        return normalizeT(response.data, schemas);
    } catch (error) {
        console.log(error);
        throw error;
        // return rejectWithValue({
        //     message: "jopa",
        // });
    }
});
