import { createSlice } from "@reduxjs/toolkit";

import { TaskId } from "../../../entities/task/types";
import { CollectionAllEnvelope } from "../../types";

type AllInboxTasksCollectionState = CollectionAllEnvelope<TaskId>;

const initialState: AllInboxTasksCollectionState = {
    totalCount: 0,
    ids: [],
};

const allInboxTasksCollection = createSlice({
    name: "allInboxTasks",
    initialState,
    reducers: {},
});

export default allInboxTasksCollection;
