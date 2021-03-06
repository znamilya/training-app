import { NormalizedSchema } from "normalizr";

import { Project, ProjectId } from "../../../enteties/project/types";
import { EntityEnvelope } from "../../types";

export type ProjectEnvelope = EntityEnvelope<Project>;

export type NormalizedReponse<T> = NormalizedSchema<
    Record<"projects", Record<ProjectId, EntityEnvelope<T>>>,
    ProjectId
>;
