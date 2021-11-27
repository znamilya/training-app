import { createAction } from "@reduxjs/toolkit";

import { TaskId } from "../../../entities/task/types";

export const complete = createAction<TaskId>("tasks/complete");
export const uncomplete = createAction<TaskId>("tasks/uncomplete");
