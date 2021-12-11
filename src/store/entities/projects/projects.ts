import { AnyAction, CaseReducer, createSlice } from "@reduxjs/toolkit";

import { Project, ProjectId } from "../../../enteties/project/types";
import * as taskEnteties from "../tasks";

import * as actions from "./actions";

type State = Record<ProjectId, Project>;

const initialState: State = {
    "1-orphans": { id: "1-orphans", title: "Orphans", isActive: false, tasks: [] },
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

                if (!project) return;

                delete state[projectId];
            })
            .addCase(
                actions.rename,
                projectExists<ReturnType<typeof actions.rename>>((state, action) => {
                    const { projectId, newTitle } = action.payload;

                    state[projectId].title = newTitle;
                }),
            )
            .addCase(actions.start, (state, action) => {
                const projectId = action.payload;
                const project = state[projectId];

                if (!project) return;

                project.isActive = true;
            })
            .addCase(actions.stop, (state, action) => {
                const projectId = action.payload;
                const project = state[projectId];

                if (!project) return;

                project.isActive = false;
            });

        // TODO: Remove when fetch data from API
        // builder
        //     .addCase(taskEnteties.actions.create, (state, action) => {
        //         const { projectId, ...task } = action.payload;

        //         if (!projectId) return state;

        //         const project = state[projectId];

        //         if (!project) return state;

        //         project.tasks.push(task.id);
        //     })
        // .addCase(taskEnteties.actions.remove, (state, action) => {
        //     const { taskId, projectId } = action.payload;

        //     if (!projectId) return state;

        //     const project = state[projectId];

        //     if (!project) return state;

        //     project.tasks = project.tasks.filter((task) => task !== taskId);
        // });

        builder.addMatcher(
            () => true,
            (selfState, { payload }) => {
                if (payload?.entities?.["projects"]) {
                    for (const project of Object.values(payload.entities.projects) as Project[]) {
                        selfState[project.id] = project;
                    }
                }
            },
        );
    },
});

export default projectsSlice;
