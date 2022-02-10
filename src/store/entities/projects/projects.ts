import { createSlice } from "@reduxjs/toolkit";

import { Project, ProjectId } from "../../../enteties/project/types";
import { EntityEnvelope } from "../../types";
import { actions as tasksActions } from "../tasks";

import * as actions from "./actions";

type State = Record<ProjectId, EntityEnvelope<Project>>;

const initialState: State = {
    // "1-orphans": { id: "1-orphans", title: "Orphans", isActive: false, tasks: [] },
};

const projectsSlice = createSlice({
    name: "projects",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            // FETCH
            .addCase(actions.fetch.pending, (selfState, { meta }) => {
                const { projectId } = meta.arg;

                if (!selfState[projectId]) {
                    selfState[projectId] = {
                        data: null,
                        status: "loading",
                        error: null,
                        isStale: true,
                    };
                }

                selfState[projectId].status = "loading";
            })
            .addCase(actions.fetch.fulfilled, (selfState, { meta, payload }) => {
                const { projectId } = meta.arg;
                const project = selfState[projectId];

                if (!project) return;

                project.isStale = false;
            })
            .addCase(actions.fetch.rejected, (selfState, { meta, error, payload }) => {
                const { projectId } = meta.arg;
                const project = selfState[projectId];

                if (!project) return;

                project.status = "error";
                project.error = error.message || "unknown error";
            })
            // CREATE
            .addCase(actions.create.fulfilled, (state, { payload }) => {
                const id = payload.result;

                state[id] = payload.entities.projects[id];
            })
            // REMOVE
            .addCase(actions.remove.pending, (state, { meta }) => {
                const { projectId } = meta.arg;
                const project = state[projectId];

                if (!project) return;

                project.status = "removing";
                project.error = null;
            })
            .addCase(actions.remove.fulfilled, (state, { payload }) => {
                const projectId = payload.result;
                const project = state[projectId];

                if (!project) return;

                delete state[projectId];
            })
            .addCase(actions.remove.rejected, (state, { meta, error }) => {
                const { projectId } = meta.arg;
                const project = state[projectId];

                if (!project) return;

                project.status = "error";
                project.error = error.message || "unknown error";
            })
            // RENAME
            .addCase(actions.rename.pending, (state, { meta }) => {
                const { projectId } = meta.arg;
                const project = state[projectId];

                if (!project) return;

                project.status = "renaming";
                project.error = null;
            })
            // .addCase(actions.rename.fulfilled, (state, { payload }) => {
            //     const projectId = payload.result;
            //     const updatedProject = payload.entities.projects[projectId];

            //     if (!state[projectId]) return;

            //     state[projectId] = updatedProject;
            // })
            // START
            .addCase(actions.start.pending, (state, { meta }) => {
                const { projectId } = meta.arg;
                const project = state[projectId];

                if (!project) return;

                project.status = "starting";
                project.error = null;
            })
            // STOP
            .addCase(actions.stop.pending, (state, { meta }) => {
                const { projectId } = meta.arg;
                const project = state[projectId];

                if (!project) return;

                project.status = "stoping";
                project.error = null;
            })
            // TASK CREATED
            .addCase(tasksActions.create.fulfilled, (selfState, { meta, payload }) => {
                const { projectId } = meta.arg;
                const project = selfState[projectId];

                if (!project) return;

                project.data?.tasks.push(payload.result);
            })
            // TASK REMOVED
            .addCase(tasksActions.remove.fulfilled, (selfState, { meta, payload }) => {
                const taskId = payload.result;
                const task = payload.entities.tasks[taskId];

                // An orphan Task was removed
                if (!task?.data?.projectId) return;

                const project = selfState[task.data.projectId];

                if (!project.data) return;

                project.data.tasks = project.data?.tasks.filter((id) => id !== taskId);
            });

        builder.addMatcher(
            () => true,
            (selfState, { payload }) => {
                if (payload?.entities?.["projects"]) {
                    for (const project of Object.values(
                        payload.entities.projects,
                    ) as EntityEnvelope<Project>[]) {
                        if (project.data) {
                            selfState[project.data.id] = project;
                        }
                    }
                }
            },
        );
    },
});

export default projectsSlice;
