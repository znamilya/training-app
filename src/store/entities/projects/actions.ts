import { createAction, nanoid } from "@reduxjs/toolkit";

import { ProjectId } from "../../../enteties/project/types";

export const create = createAction("projects/create", ({ title }: { title: string }) => ({
    payload: {
        id: nanoid(),
        title,
    },
}));
export const remove = createAction<{ projectId: ProjectId }>("projects/remove");
export const rename = createAction<{ projectId: ProjectId; newTitle: string }>("projects/rename");
export const start = createAction<{ projectId: ProjectId }>("projects/start");
export const stop = createAction<{ projectId: ProjectId }>("projects/stop");
