import { AnyId } from "../types";

export type HasStatus = {
    status: string;
};

export type HasError<T = any> = {
    error: T | null;
};

/*******************************************************************
 * ENTITIES
 *******************************************************************/
export type EntityEnvelope<T> = {
    data: T | null;
} & HasStatus &
    HasError<string>;

/*******************************************************************
 * COLLECTIONS
 *******************************************************************/
export type CollectionEvelope<EntityId extends AnyId = string> = {
    totalCount: number;
    ids: EntityId[];
    isStale: boolean;
} & HasStatus &
    HasError<string>;

export type CollectionAllEnvelope<EntityId extends AnyId = string> = CollectionEvelope<EntityId>;

export type CollectionByEnvelope<
    EntityId extends AnyId = string,
    EntityById extends AnyId = string,
> = Record<EntityById, CollectionEvelope<EntityId>>;
