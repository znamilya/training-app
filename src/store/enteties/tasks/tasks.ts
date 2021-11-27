import { createSlice } from "@reduxjs/toolkit";

import { Task, TaskId } from "../../../entities/task/types";

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
});

export default projectsSlice;
