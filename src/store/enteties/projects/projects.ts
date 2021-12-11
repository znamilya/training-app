import { createSlice } from "@reduxjs/toolkit";

import { Project, ProjectId } from "../../../entities/project/types";
import * as taskEnteties from "../tasks";

import * as actions from "./actions";

type State = Record<ProjectId, Project>;

const initialState: State = {
    "1-orphans": { id: "1-orphans", title: "Orphans", isActive: false, tasks: [] },
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
            .addCase(actions.remove, (state, action) => {
                const projectId = action.payload;
                const project = state[projectId];

                if (!project) return state;

                delete state[projectId];
            })
            .addCase(actions.rename, (state, action) => {
                const { projectId, newTitle } = action.payload;
                const project = state[projectId];

                if (!project) return state;

                state[projectId].title = newTitle;
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
        builder
            .addCase(taskEnteties.actions.create, (state, action) => {
                const { projectId, ...task } = action.payload;

                if (!projectId) return state;

                const project = state[projectId];

                if (!project) return state;

                project.tasks.push(task.id);
            })
            .addCase(taskEnteties.actions.remove, (state, action) => {
                const { taskId, projectId } = action.payload;

                if (!projectId) return state;

                const project = state[projectId];

                if (!project) return state;

                project.tasks = project.tasks.filter((task) => task !== taskId);
            });
    },
});

export default projectsSlice;
