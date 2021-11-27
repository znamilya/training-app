import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import projectsEnteties from "./enteties/projects";
import tasksEnteties from "./enteties/tasks";
import allActiveProjectsCollection from "./collections/allActiveProjects";
import allInboxTasksCollection from "./collections/allInboxTasks";
import allProjectsCollection from "./collections/allProjects";
import allTodayTasksCollection from "./collections/allTodayTasks";
import tasksByProjectsCollection from "./collections/tasksByProjects";

const store = configureStore({
    reducer: combineReducers({
        enteties: combineReducers({
            projects: projectsEnteties.reducer,
            tasks: tasksEnteties.reducer,
        }),
        collections: combineReducers({
            allActiveProjects: allActiveProjectsCollection.reducer,
            allProjects: allProjectsCollection.reducer,
            allInboxTasks: allInboxTasksCollection.reducer,
            allTodayTasks: allTodayTasksCollection.reducer,
            tasksByProjects: tasksByProjectsCollection.reducer,
        }),
    }),
    devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
