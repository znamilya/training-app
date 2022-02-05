import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import thunkMiddleware from "redux-thunk";

import projectsEnteties from "./entities/projects";
import tasksEnteties from "./entities/tasks";
import allInboxTasksCollection from "./collections/allInboxTasks";
import allProjectsCollection from "./collections/allProjects";
import ProjectsService from "../services/ProjectsService";
import SupabaseApiService from "../services/SupabaseApiService";

export const rootReducer = combineReducers({
    enteties: combineReducers({
        projects: projectsEnteties.reducer,
        tasks: tasksEnteties.reducer,
    }),
    collections: combineReducers({
        allProjects: allProjectsCollection.reducer,
        allInboxTasks: allInboxTasksCollection.reducer,
    }),
});

const apiService = new SupabaseApiService({
    url: "https://laielpakeuvmclzkdhpo.supabase.co",
});

const projectsService = new ProjectsService({
    apiService,
});

const store = configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: [thunkMiddleware.withExtraArgument({ projectsService })],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
