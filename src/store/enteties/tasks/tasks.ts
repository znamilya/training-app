import { createSlice } from "@reduxjs/toolkit";

import { Task, TaskId } from "../../../entities/task/types";

import * as actions from "./actions";

type State = Record<TaskId, Task>;

const initialState: State = {
    1: { id: "1", title: "Read chapter 1", isComplete: true, projectId: "1" },
    2: { id: "2", title: "Read chapter 2", isComplete: true, projectId: "1" },
    3: { id: "3", title: "Read chapter 3", isComplete: false, projectId: "1" },
};

const projectsSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(actions.complete, (state, action) => {
                const taskId = action.payload;
                const task = state[taskId];

                if (!task) return state;

                task.isComplete = true;
            })
            .addCase(actions.uncomplete, (state, action) => {
                const taskId = action.payload;
                const task = state[taskId];

                if (!task) return state;

                task.isComplete = false;
            });
    },
});

export default projectsSlice;
