import { createSlice, isAllOf, isPending, PayloadAction } from "@reduxjs/toolkit";

import { Task, TaskId } from "../../../enteties/task";
import { EntityEnvelope } from "../../types";

import * as actions from "./actions";

type State = Record<TaskId, EntityEnvelope<Task>>;

const initialState: State = {};

const slice = createSlice({
    name: "tasks",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(actions.rename, (selfState, action) => {
                const { taskId, newTitle } = action.payload;
                const task = selfState[taskId];

                if (!task.data) return;

                task.data.title = newTitle;
            })
            // REMOVE
            .addCase(actions.remove.pending, (selfState, { meta }) => {
                const taskId = meta.arg;
                const task = selfState[taskId];

                if (!task) return;

                task.status = "removing";
                task.error = null;
            })
            .addCase(actions.remove.fulfilled, (selfState, { meta }) => {
                const taskId = meta.arg;
                const task = selfState[taskId];

                if (!task) return;

                task.status = "idle";
            })
            .addCase(actions.remove.rejected, (selfState, { meta, error }) => {
                const taskId = meta.arg;
                const task = selfState[taskId];

                if (!task) return;

                task.status = "error";
                task.error = error.message || "";
            })
            // COMPLETE
            .addCase(actions.complete.pending, (selfState, { meta }) => {
                const { taskId } = meta.arg;
                const task = selfState[taskId];

                if (!task) return;

                task.status = "completing";
                task.error = null;
            })
            .addCase(actions.complete.fulfilled, (selfState, { meta }) => {
                const { taskId } = meta.arg;
                const task = selfState[taskId];

                if (!task) return;

                task.status = "idle";
            })
            .addCase(actions.complete.rejected, (selfState, { meta, error }) => {
                const { taskId } = meta.arg;
                const task = selfState[taskId];

                if (!task) return;

                task.status = "error";
                task.error = error.message || "";
            })
            // START
            .addCase(actions.start.pending, (selfState, { meta }) => {
                const { taskId } = meta.arg;
                const task = selfState[taskId];

                if (!task) return;

                task.status = "starting";
                task.error = null;
            })
            .addCase(actions.start.fulfilled, (selfState, { meta }) => {
                const { taskId } = meta.arg;
                const task = selfState[taskId];

                if (!task) return;

                task.status = "idle";
            })
            .addCase(actions.start.rejected, (selfState, { meta, error }) => {
                const { taskId } = meta.arg;
                const task = selfState[taskId];

                if (!task) return;

                task.status = "error";
                task.error = error.message || "";
            })
            // STOP
            .addCase(actions.stop.pending, (selfState, { meta }) => {
                const { taskId } = meta.arg;
                const task = selfState[taskId];

                if (!task) return;

                task.status = "stoping";
                task.error = null;
            })
            .addCase(actions.stop.fulfilled, (selfState, { meta }) => {
                const { taskId } = meta.arg;
                const task = selfState[taskId];

                if (!task) return;

                task.status = "idle";
            })
            .addCase(actions.stop.rejected, (selfState, { meta, error }) => {
                const { taskId } = meta.arg;
                const task = selfState[taskId];

                if (!task) return;

                task.status = "error";
                task.error = error.message || "";
            });

        builder.addMatcher(
            () => true,
            (selfState, { payload }) => {
                if (payload?.entities?.["tasks"]) {
                    for (const task of Object.values(
                        payload.entities.tasks,
                    ) as EntityEnvelope<Task>[]) {
                        if (task.data) {
                            selfState[task.data.id] = task;
                        }
                    }
                }
            },
        );
    },
});

export default slice;
