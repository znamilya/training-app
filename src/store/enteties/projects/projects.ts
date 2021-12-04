import { createSlice } from "@reduxjs/toolkit";

import { Project, ProjectId } from "../../../entities/project/types";
import * as taskEnteties from "../tasks";

import * as actions from "./actions";

type State = Record<ProjectId, Project>;

const initialState: State = {
    // 1: { id: "1", title: "Read a book", isActive: true, tasks: ["1", "2", "3"] },
    // 2: { id: "2", title: "Clean up the kitchen", isActive: true, tasks: [] },
    // 3: { id: "3", title: "Fill in the form", isActive: false, tasks: [] },
};

const projectsSlice = createSlice({
    name: "projects",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(actions.create, (state, action) => {
                const { id, title } = action.payload;

                state[id] = {
                    id,
                    title,
                    tasks: [],
                    isActive: false,
                };
            })
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

        // TODO: Remove when fetch data from API
        builder.addCase(taskEnteties.actions.create, (state, action) => {
            const { projectId, ...task } = action.payload;

            if (!projectId) return state;

            const project = state[projectId];

            if (!project) return state;

            project.tasks.push(task.id);
        });
    },
});

export default projectsSlice;
