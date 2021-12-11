import { AnyId } from "../types";

/*******************************************************************
 * COLLECTIONS
 *******************************************************************/
export type CollectionEvelope<EntityId extends AnyId = string> = {
    totalCount: number;
    ids: EntityId[];
    status: string;
};

export type CollectionAllEnvelope<EntityId extends AnyId = string> = CollectionEvelope<EntityId>;

export type CollectionByEnvelope<
    EntityId extends AnyId = string,
    EntityById extends AnyId = string,
> = Record<EntityById, CollectionEvelope<EntityId>>;
