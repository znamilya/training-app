import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

import projectsEnteties from "./enteties/projects";
import tasksEnteties from "./enteties/tasks";
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

const persistConfig = {
    key: "mrdone",
    storage,
};

const store = configureStore({
    reducer: persistReducer(persistConfig, rootReducer),
    devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
