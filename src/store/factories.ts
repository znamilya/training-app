import deepmerge from "deepmerge";
import { DeepPartial } from "utility-types";

import { RootState } from "./store";
import { CollectionAllEnvelope } from "./types";

export const buildEmptyCollectionAll = (
    overrides: DeepPartial<CollectionAllEnvelope> = {},
): CollectionAllEnvelope =>
    deepmerge(
        {
            totalCount: 0,
            ids: [],
            status: "idle",
        },
        overrides as CollectionAllEnvelope,
    );

export const buildEmptyRootState = (overrides: DeepPartial<RootState> = {}): RootState =>
    deepmerge(
        {
            enteties: {
                tasks: {},
                projects: {},
            },
            collections: {
                allProjects: buildEmptyCollectionAll(),
                allInboxTasks: buildEmptyCollectionAll(),
            },
        },
        overrides as RootState,
    );
