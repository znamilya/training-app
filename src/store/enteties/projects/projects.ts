import { createSlice, current } from "@reduxjs/toolkit";

import { Project, ProjectId } from "../../../entities/project/types";

import * as actions from "./actions";

type State = Record<ProjectId, Project>;

const initialState: State = {
    1: { id: "1", title: "Read a book", isActive: true, tasks: ["1", "2", "3"] },
    2: { id: "2", title: "Clean up the kitchen", isActive: true, tasks: [] },
    3: { id: "3", title: "Fill in the form", isActive: false, tasks: [] },
};

const projectsSlice = createSlice({
    name: "projects",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(actions.start, (state, action) => {
                const projectId = action.payload;
                const project = state[projectId];

                if (!project) return state;

                project.isActive = true;
            })
            .addCase(actions.stop, (state, action) => {
                const projectId = action.payload;
                const project = state[projectId];

                if (!project) return state;

                project.isActive = false;
            });
    },
});

export default projectsSlice;
