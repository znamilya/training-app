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
                selfState.status = "success";
            })
            .addCase(actions.load.rejected, (selfState, action) => {
                selfState.status = "error";
            })
            .addCase(projectEnteties.actions.create, (state, { payload }) => {
                const { id } = payload;

                state.totalCount += 1;
                state.ids.push(id);
            })
            .addCase(projectEnteties.actions.remove, (state, { payload }) => {
                const { projectId } = payload;

                state.totalCount -= 1;
                state.ids = state.ids.filter((id) => id !== projectId);
            });
    },
});

export default allProjectsCollection;
