import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import thunkMiddleware from "redux-thunk";

import projectsEnteties from "./entities/projects";
import tasksEnteties from "./entities/tasks";
import allActiveProjects from "./collections/allActiveProjects";
import allActiveTasks from "./collections/allActiveTasks";
import allCompletedProjects from "./collections/allCompletedProjects";
import allInboxTasksCollection from "./collections/allInboxTasks";
import allProjectsCollection from "./collections/allProjects";
import SupabaseApiService from "../services/SupabaseApiService";
import ProjectsService from "../services/ProjectsService";
import TasksService from "../services/TasksService";

export const rootReducer = combineReducers({
    enteties: combineReducers({
        projects: projectsEnteties.reducer,
        tasks: tasksEnteties.reducer,
    }),
    collections: combineReducers({
        allActiveProjects: allActiveProjects.reducer,
        allActiveTasks: allActiveTasks.reducer,
        allCompletedProjects: allCompletedProjects.reducer,
        allInboxTasks: allInboxTasksCollection.reducer,
        allProjects: allProjectsCollection.reducer,
    }),
});

const apiService = new SupabaseApiService({
    url: "https://laielpakeuvmclzkdhpo.supabase.co",
});

const projectsService = new ProjectsService({
    apiService,
});

const tasksService = new TasksService({
    apiService,
});

const store = configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: [thunkMiddleware.withExtraArgument({ projectsService, tasksService })],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
