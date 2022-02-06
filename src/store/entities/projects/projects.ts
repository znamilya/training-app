import { AnyAction, CaseReducer, createSlice, isAllOf, isFulfilled } from "@reduxjs/toolkit";

import { Project, ProjectId } from "../../../enteties/project/types";
import { EntityEnvelope } from "../../types";

import * as actions from "./actions";

type State = Record<ProjectId, EntityEnvelope<Project>>;

const initialState: State = {
    // "1-orphans": { id: "1-orphans", title: "Orphans", isActive: false, tasks: [] },
};

const projectExists =
    <A extends AnyAction>(reducer: CaseReducer<State, A>) =>
    (state: State, action: A) => {
        const { projectId } = action.payload;

        const project = state[projectId];

        if (!project) return;

        reducer(state, action);
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
                    };
                }

                selfState[projectId].status = "loading";
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

                state[projectId].status = "removing";
                state[projectId].error = null;
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

                state[projectId].status = "error";
                state[projectId].error = error.message || "unknown error";
            })
            // RENAME
            .addCase(
                actions.rename,
                projectExists<ReturnType<typeof actions.rename>>((state, action) => {
                    const { projectId, newTitle } = action.payload;
                    const project = state[projectId];

                    if (!project.data) {
                        return;
                    }

                    project.data.title = newTitle;
                }),
            )
            // START
            .addCase(actions.start, (state, action) => {
                const { projectId } = action.payload;
                const project = state[projectId];

                if (!project.data) return;

                project.data.isActive = true;
            })
            // STOP
            .addCase(actions.stop, (state, action) => {
                const { projectId } = action.payload;
                const project = state[projectId];

                if (!project.data) return;

                project.data.isActive = false;
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
