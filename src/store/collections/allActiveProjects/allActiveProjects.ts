import { createSlice } from "@reduxjs/toolkit";

import { ProjectId } from "../../../entities/project/types";
import { CollectionAllEnvelope } from "../../types";

type AllActiveProjectsCollectionState = CollectionAllEnvelope<ProjectId>;

const initialState: AllActiveProjectsCollectionState = {
    totalCount: 2,
    ids: ["1", "2"],
};

const allActiveProjectsCollection = createSlice({
    name: "allActiveProjects",
    initialState,
    reducers: {},
});

export default allActiveProjectsCollection;
