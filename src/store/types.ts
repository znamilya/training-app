import { AnyId } from "../types";

export type HasStatus<T extends string = string> = {
    status: T;
};

export type HasError<T = any> = {
    error: T | null;
};

/*******************************************************************
 * ENTITIES
 *******************************************************************/
export type EntityEnvelope<T> = {
    data: T | null;
    isStale: boolean;
} & HasStatus &
    HasError<string>;

/*******************************************************************
 * COLLECTIONS
 *******************************************************************/
export type CollectionEvelope<EntityId extends AnyId = string, Statuses extends string = string> = {
    totalCount: number;
    ids: EntityId[];
    isStale: boolean;
} & HasStatus<Statuses> &
    HasError<string>;

export type CollectionAllEnvelope<
    EntityId extends AnyId = string,
    Statuses extends string = string,
> = CollectionEvelope<EntityId, Statuses>;

export type CollectionByEnvelope<
    EntityId extends AnyId = string,
    EntityById extends AnyId = string,
    Statuses extends string = string,
> = Record<EntityById, CollectionEvelope<EntityId, Statuses>>;
