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
};

const allProjectsCollection = createSlice({
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
                selfState.totalCount = payload.result.length;
                selfState.status = "success";
            })
            .addCase(actions.load.rejected, (selfState) => {
                selfState.status = "error";
            })
            // ENTITY ACIONS
            .addCase(projectEnteties.actions.create.fulfilled, (selfState, { payload }) => {
                selfState.totalCount += 1;

                selfState.ids.push(payload.result);
            })
            .addCase(projectEnteties.actions.remove, (selfState, { payload }) => {
                const { projectId } = payload;

                selfState.totalCount -= 1;
                selfState.ids = selfState.ids.filter((id) => id !== projectId);
            });
    },
});

export default allProjectsCollection;
