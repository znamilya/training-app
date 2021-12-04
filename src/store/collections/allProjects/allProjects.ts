import { createSlice } from "@reduxjs/toolkit";

import { ProjectId } from "../../../entities/project/types";
import { CollectionAllEnvelope } from "../../types";
import * as projectEnteties from "../../enteties/projects";

type AllProjectsCollectionState = CollectionAllEnvelope<ProjectId>;

const initialState: AllProjectsCollectionState = {
    totalCount: 0,
    ids: [],
};

const allProjectsCollection = createSlice({
    name: "allProjects",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(projectEnteties.actions.create, (state, { payload }) => {
            const { id } = payload;

            state.ids.push(id);
        });
    },
});

export default allProjectsCollection;
