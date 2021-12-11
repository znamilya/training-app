import { schema as normalizr } from "normalizr";

import { Project } from "../../../enteties/project/types";

export const schema = new normalizr.Entity<Project>(
    "projects",
    {},
    {
        idAttribute: "id",
    },
);

export const schemas = new normalizr.Array(schema);
