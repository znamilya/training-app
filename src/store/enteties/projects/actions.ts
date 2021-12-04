import { createAction, nanoid } from "@reduxjs/toolkit";

import { ProjectId } from "../../../entities/project/types";

export const create = createAction("projects/create", ({ title }: { title: string }) => ({
    payload: {
        id: nanoid(),
        title,
    },
}));

export const start = createAction<ProjectId>("projects/start");

export const stop = createAction<ProjectId>("projects/stop");
