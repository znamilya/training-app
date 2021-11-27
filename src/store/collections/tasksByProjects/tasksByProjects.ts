import { createSlice } from "@reduxjs/toolkit";
import { ProjectId } from "../../../entities/project/types";

import { TaskId } from "../../../entities/task/types";
import type { CollectionByEnvelope } from "../../types";

type TasksByProjectsCollectionState = CollectionByEnvelope<TaskId, ProjectId>;

const initialState: TasksByProjectsCollectionState = {
    "1": {
        totalCount: 3,
        ids: ["1", "2", "3"],
    },
};

const tasksByProjectsCollection = createSlice({
    name: "tasksByProjects",
    initialState,
    reducers: {},
});

export default tasksByProjectsCollection;
