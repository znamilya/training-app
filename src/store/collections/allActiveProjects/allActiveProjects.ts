import { createSlice } from "@reduxjs/toolkit";

import { ProjectId } from "../../../entities/project/types";
import { CollectionAllEnvelope } from "../../types";

type AllActiveProjectsCollectionState = CollectionAllEnvelope<ProjectId>;

const initialState: AllActiveProjectsCollectionState = {
    totalCount: 0,
    ids: [],
};

const allActiveProjectsCollection = createSlice({
    name: "allActiveProjects",
    initialState,
    reducers: {},
});

export default allActiveProjectsCollection;
