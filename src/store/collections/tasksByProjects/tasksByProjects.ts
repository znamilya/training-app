import { createSlice } from "@reduxjs/toolkit";
import { ProjectId } from "../../../entities/project/types";

import { TaskId } from "../../../entities/task/types";
import type { CollectionByEnvelope } from "../../types";
import * as projectsEnteties from "../../enteties/projects";
import * as taskEnteties from "../../enteties/tasks";

type TasksByProjectsCollectionState = CollectionByEnvelope<TaskId, ProjectId>;

const initialState: TasksByProjectsCollectionState = {};

const tasksByProjectsCollection = createSlice({
    name: "tasksByProjects",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(projectsEnteties.actions.create, (state, action) => {
            const { id } = action.payload;

            state[id] = {
                totalCount: 0,
                ids: [],
            };
        });
        builder.addCase(taskEnteties.actions.create, (state, action) => {
            const { projectId, ...task } = action.payload;

            if (!projectId) return state;

            const project = state[projectId];

            if (!project) return state;

            project.ids.push(task.id);
        });
    },
});

export default tasksByProjectsCollection;
