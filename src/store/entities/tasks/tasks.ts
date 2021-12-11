import { createSlice } from "@reduxjs/toolkit";

import { Task, TaskId } from "../../../enteties/task";

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

                // @ts-ignore
                state[task.id] = {
                    isComplete: false,
                    isNextAction: false,
                    ...task,
                };
            })
            .addCase(actions.rename, (state, action) => {
                const { taskId, newTitle } = action.payload;
                const task = state[taskId];

                if (!task) return state;

                state[taskId].title = newTitle;
            })
            .addCase(actions.remove, (state, action) => {
                const { taskId } = action.payload;
                const task = state[taskId];

                if (!task) return state;

                delete state[taskId];
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
