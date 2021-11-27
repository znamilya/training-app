import { AnyId } from "../types";

/*******************************************************************
 * COLLECTIONS
 *******************************************************************/
export type CollectionEvelope<EntityId extends AnyId> = {
    totalCount: number;
    ids: EntityId[];
};

export type CollectionAllEnvelope<EntityId extends AnyId> = CollectionEvelope<EntityId>;

export type CollectionByEnvelope<EntityId extends AnyId, EntityById extends AnyId> = Record<
    EntityById,
    CollectionEvelope<EntityId>
>;
