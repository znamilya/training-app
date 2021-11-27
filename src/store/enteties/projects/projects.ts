import { createSlice } from "@reduxjs/toolkit";

import { Project, ProjectId } from "../../../entities/project/types";

type State = Record<ProjectId, Project>;

const initialState: State = {
    1: { id: "1", title: "Read a book", isActive: true, tasks: ["1", "2", "3"] },
    2: { id: "2", title: "Clean up the kitchen", isActive: true, tasks: [] },
    3: { id: "3", title: "Fill in the form", isActive: false, tasks: [] },
};

const projectsSlice = createSlice({
    name: "projects",
    initialState,
    reducers: {},
});

export default projectsSlice;
