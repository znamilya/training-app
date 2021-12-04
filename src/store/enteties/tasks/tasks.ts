import { createSlice } from "@reduxjs/toolkit";

import { Task, TaskId } from "../../../entities/task/types";

import * as actions from "./actions";

type State = Record<TaskId, Task>;

const initialState: State = {};

const slice = createSlice({
    name: "tasks",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(actions.create, (state, action) => {
                const task = action.payload;

                state[task.id] = {
                    ...task,
                    isComplete: false,
                    isInbox: false,
                    isNextAction: false,
                };
            })
            .addCase(actions.schedule, (state, action) => {
                const taskId = action.payload;
                const task = state[taskId];

                if (!task) return state;

                task.isNextAction = true;
            })
            .addCase(actions.unschedule, (state, action) => {
                const taskId = action.payload;
                const task = state[taskId];

                if (!task) return state;

                task.isNextAction = false;
            })
            .addCase(actions.complete, (state, action) => {
                const taskId = action.payload;
                const task = state[taskId];

                if (!task) return state;

                task.isComplete = true;
                task.isNextAction = false;
            })
            .addCase(actions.uncomplete, (state, action) => {
                const taskId = action.payload;
                const task = state[taskId];

                if (!task) return state;

                task.isComplete = false;
            });
    },
});

export default slice;
