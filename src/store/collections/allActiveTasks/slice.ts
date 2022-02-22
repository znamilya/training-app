import { createSlice } from "@reduxjs/toolkit";

import { ProjectId } from "../../../enteties/project/types";
import { CollectionAllEnvelope } from "../../types";
import * as tasksEnteties from "../../entities/tasks";

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
            .addCase(tasksEnteties.actions.start.fulfilled, (selfState, { payload }) => {
                selfState.totalCount += 1;
                selfState.isStale = true;
            })
            .addCase(tasksEnteties.actions.stop.fulfilled, (selfState, { payload }) => {
                const taskId = payload.result;

                // Check that stopped Task was active and do nothing if it is wasn't
                if (!selfState.ids.includes(taskId)) return;

                selfState.totalCount -= 1;
                selfState.isStale = true;
                selfState.ids = selfState.ids.filter((id) => id !== taskId);
            });
    },
});

export default slice;
