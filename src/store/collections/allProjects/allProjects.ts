import { createSlice } from "@reduxjs/toolkit";

import { ProjectId } from "../../../entities/project/types";
import { CollectionAllEnvelope } from "../../types";

type AllProjectsCollectionState = CollectionAllEnvelope<ProjectId>;

const initialState: AllProjectsCollectionState = {
    totalCount: 3,
    ids: ["1", "2", "3"],
};

const allProjectsCollection = createSlice({
    name: "allProjects",
    initialState,
    reducers: {},
});

export default allProjectsCollection;
