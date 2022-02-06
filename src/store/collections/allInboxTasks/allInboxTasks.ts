import { createSlice } from "@reduxjs/toolkit";

import { TaskId } from "../../../enteties/task";
import { CollectionAllEnvelope } from "../../types";

type AllInboxTasksCollectionState = CollectionAllEnvelope<TaskId>;

const initialState: AllInboxTasksCollectionState = {
    totalCount: 0,
    ids: [],
    status: "idle",
    error: null,
    isStale: false,
};

const allInboxTasksCollection = createSlice({
    name: "allInboxTasks",
    initialState,
    reducers: {},
});

export default allInboxTasksCollection;
