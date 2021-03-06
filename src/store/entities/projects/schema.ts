import { schema as normalizr } from "normalizr";

import { Project } from "../../../enteties/project/types";
import { EntityEnvelope } from "../../types";
import { wrapEntityEnvelope } from "../../utils";
import { schema as tasksSchema } from "../tasks";

export const schema = new normalizr.Entity<EntityEnvelope<Project>>(
    "projects",
    {
        data: {
            tasks: [tasksSchema],
        },
    },
    {
        idAttribute: "id",
        processStrategy: (entity: Project) => wrapEntityEnvelope(entity),
    },
);

export const schemas = new normalizr.Array(schema);
