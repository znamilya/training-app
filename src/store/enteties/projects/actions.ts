import { createAction } from "@reduxjs/toolkit";

import { ProjectId } from "../../../entities/project/types";

export const start = createAction<ProjectId>("projects/start");
export const stop = createAction<ProjectId>("projects/stop");
