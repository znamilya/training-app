import { AnyAction, CaseReducer, createSlice } from "@reduxjs/toolkit";

import { Project, ProjectId } from "../../../enteties/project/types";
import { EntityEnvelope } from "../../types";
import * as taskEnteties from "../tasks";

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
            .addCase(actions.create.fulfilled, (state, { payload }) => {
                const id = payload.result;

                state[id] = payload.entities.projects[id];
            })
            .addCase(actions.remove, (state, action) => {
                const { projectId } = action.payload;
                const project = state[projectId];

                if (!project) return;

                delete state[projectId];
            })
            .addCase(
                actions.rename,
                projectExists<ReturnType<typeof actions.rename>>((state, action) => {
                    const { projectId, newTitle } = action.payload;

                    state[projectId].data.title = newTitle;
                }),
            )
            .addCase(actions.start, (state, action) => {
                const { projectId } = action.payload;
                const project = state[projectId];

                if (!project) return;

                project.data.isActive = true;
            })
            .addCase(actions.stop, (state, action) => {
                const { projectId } = action.payload;
                const project = state[projectId];

                if (!project) return;

                project.data.isActive = false;
            });

        builder.addMatcher(
            () => true,
            (selfState, { payload }) => {
                if (payload?.entities?.["projects"]) {
                    for (const project of Object.values(
                        payload.entities.projects,
                    ) as EntityEnvelope<Project>[]) {
                        selfState[project.data.id] = project;
                    }
                }
            },
        );
    },
});

export default projectsSlice;
