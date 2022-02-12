import { createSlice, isFulfilled, isPending, isRejected, PayloadAction } from "@reduxjs/toolkit";

import { Project, ProjectId } from "../../../enteties/project/types";
import { EntityEnvelope } from "../../types";
import { actions as tasksActions } from "../tasks";

import * as actions from "./actions";

type State = Record<ProjectId, EntityEnvelope<Project>>;

const initialState: State = {};

const hasProjectId = (
    action: PayloadAction<any, string, { arg: any }>,
): action is PayloadAction<any, string, { arg: { projectId: ProjectId } }> =>
    typeof action.meta.arg?.projectId === "string";

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
            .addCase(actions.fetch.fulfilled, (selfState, { meta }) => {
                const { projectId } = meta.arg;
                const project = selfState[projectId];

                if (!project) return;

                project.isStale = false;
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
            })
            .addCase(actions.remove.fulfilled, (state, { payload }) => {
                const projectId = payload.result;
                const project = state[projectId];

                if (!project) return;

                delete state[projectId];
            })
            // RENAME
            .addCase(actions.rename.pending, (state, { meta }) => {
                const { projectId } = meta.arg;
                const project = state[projectId];

                if (!project) return;

                project.status = "renaming";
            })
            // START
            .addCase(actions.start.pending, (state, { meta }) => {
                const { projectId } = meta.arg;
                const project = state[projectId];

                if (!project) return;

                project.status = "starting";
            })
            // STOP
            .addCase(actions.stop.pending, (state, { meta }) => {
                const { projectId } = meta.arg;
                const project = state[projectId];

                if (!project) return;

                project.status = "stoping";
            })
            // COMPLETE
            .addCase(actions.complete.pending, (state, { meta }) => {
                const { projectId } = meta.arg;
                const project = state[projectId];

                if (!project) return;

                project.status = "compliting";
            })

            // TASK CREATED
            .addCase(tasksActions.create.fulfilled, (selfState, { meta, payload }) => {
                const { projectId } = meta.arg;
                const project = selfState[projectId];

                if (!project) return;

                project.data?.tasks.push(payload.result);
            })
            // TASK REMOVED
            .addCase(tasksActions.remove.fulfilled, (selfState, { payload }) => {
                const taskId = payload.result;
                const task = payload.entities.tasks[taskId];

                // An orphan Task was removed
                if (!task?.data?.projectId) return;

                const project = selfState[task.data.projectId];

                if (!project.data) return;

                project.data.tasks = project.data?.tasks.filter((id) => id !== taskId);
            });

        builder.addMatcher(isPending, (selfState, action) => {
            if (!hasProjectId(action)) return;

            const { projectId } = action.meta.arg;
            const project = selfState[projectId];

            if (!project) return;

            project.error = null;
        });

        builder.addMatcher(isFulfilled, (selfState, action) => {
            if (!hasProjectId(action)) return;

            const { projectId } = action.meta.arg;
            const project = selfState[projectId];

            if (!project) return;

            project.status = "idle";
        });

        builder.addMatcher(isRejected, (selfState, action) => {
            if (!hasProjectId(action)) return;

            const { projectId } = action.meta.arg;
            const project = selfState[projectId];

            if (!project) return;

            project.status = "error";
            project.error = action.error.message || "unknown error";
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
