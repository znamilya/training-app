import { createAction, nanoid } from "@reduxjs/toolkit";

import { ProjectId } from "../../../entities/project/types";

export const create = createAction("projects/create", ({ title }: { title: string }) => ({
    payload: {
        id: nanoid(),
        title,
    },
}));
export const remove = createAction<ProjectId>("projects/remove");
export const rename = createAction<{ projectId: ProjectId; newTitle: string }>("projects/rename");
export const start = createAction<ProjectId>("projects/start");
export const stop = createAction<ProjectId>("projects/stop");
