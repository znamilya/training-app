import { schema } from "normalizr";
import { tasksSchema } from "../task";

import { Project } from "./types";

export const projectSchema = new schema.Entity<Project>("projects", {
    tasks: tasksSchema,
});

export const projectsSchema = new schema.Array(projectSchema);
