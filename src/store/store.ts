import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import projectsEnteties from "./entities/projects";
import tasksEnteties from "./entities/tasks";
import allInboxTasksCollection from "./collections/allInboxTasks";
import allProjectsCollection from "./collections/allProjects";

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

const store = configureStore({
    reducer: rootReducer,
    devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
