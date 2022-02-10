import { createSlice } from "@reduxjs/toolkit";

import { ProjectId } from "../../../enteties/project/types";
import { CollectionAllEnvelope } from "../../types";
import * as projectEnteties from "../../entities/projects";

import * as actions from "./actions";

type AllProjectsCollectionState = CollectionAllEnvelope<ProjectId>;

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
            })
            .addCase(actions.load.fulfilled, (selfState, { payload }) => {
                selfState.ids = payload.result;
                selfState.totalCount = payload.totalCount;
                selfState.status = "success";
                selfState.isStale = false;
            })
            .addCase(actions.load.rejected, (selfState, { error }) => {
                selfState.status = "error";
                selfState.error = error.message || null;
            })
            // ENTITY ACIONS
            .addCase(projectEnteties.actions.start.fulfilled, (selfState, { payload }) => {
                const projectId = payload.result;

                selfState.ids.push(projectId);
            })
            .addCase(projectEnteties.actions.stop.fulfilled, (selfState, { payload }) => {
                const projectId = payload.result;

                selfState.ids = selfState.ids.filter((id) => id !== projectId);
            })
            .addCase(projectEnteties.actions.remove.fulfilled, (selfState, { payload }) => {
                const projectId = payload.result;

                selfState.ids = selfState.ids.filter((id) => id !== projectId);
            });
    },
});

export default slice;
