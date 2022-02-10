import { schema as normalizr } from "normalizr";

import { Task } from "../../../enteties/task";
import { EntityEnvelope } from "../../types";
import { wrapEntityEnvelope } from "../../utils";

export const schema = new normalizr.Entity<EntityEnvelope<Task>>(
    "tasks",
    {},
    {
        idAttribute: "id",
        processStrategy: (entity: Task) => wrapEntityEnvelope(entity),
    },
);

export const schemas = new normalizr.Array(schema);
