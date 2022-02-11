import { createSlice } from "@reduxjs/toolkit";

import { ProjectId } from "../../../enteties/project/types";
import { CollectionAllEnvelope } from "../../types";
import * as projectEnteties from "../../entities/projects";

import * as actions from "./actions";

type AllProjectsCollectionState = CollectionAllEnvelope<ProjectId, "idle" | "loading" | "error">;

const initialState: AllProjectsCollectionState = {
    totalCount: 0,
    ids: [],
    status: "idle",
    error: null,
    isStale: true,
};

const slice = createSlice({
    name: "allProjects",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(actions.load.pending, (selfState) => {
                selfState.status = "loading";
                selfState.error = null;
            })
            .addCase(actions.load.fulfilled, (selfState, { payload }) => {
                selfState.status = "idle";
                selfState.ids = payload.result;
                selfState.totalCount = payload.totalCount;
                selfState.isStale = false;
            })
            .addCase(actions.load.rejected, (selfState, { error }) => {
                selfState.status = "error";
                selfState.error = error.message || null;
            })
            // ENTITY ACIONS
            .addCase(projectEnteties.actions.complete.fulfilled, (selfState, { payload }) => {
                selfState.isStale = true;
            });
    },
});

export default slice;
