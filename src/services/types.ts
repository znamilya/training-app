import { Either } from "@sweet-monads/either";

import NetworkError from "../errors/NetworkError";

export type Embedded = {
    name: string;
    orderBy?: string;
};

export type Options<TRemote> = {
    embed?: Embedded[];
    match?: Record<string, any>;
    orderBy?: keyof TRemote;
};

export interface IRestApiService {
    getAll<TRemote extends object, TLocal extends object>(
        resourceName: string,
        options?: Options<TRemote>,
    ): Promise<Either<NetworkError, { data: TLocal[]; totalCount: number }>>;
    get<TRemote extends object, TLocal extends object>(
        resourceName: string,
        resourseId: any,
        options?: Options<TLocal>,
    ): Promise<Either<NetworkError, TLocal>>;
    insert<TRemote extends object, TLocal extends object>(
        resourceName: string,
        data: Partial<TLocal>,
    ): Promise<Either<NetworkError, TLocal>>;
    remove<TRemote extends object, TLocal extends object>(
        resourceName: string,
        resourseId: any,
    ): Promise<Either<NetworkError, TLocal>>;
    update<TRemote extends object, TLocal extends object>(
        resourceName: string,
        resourseId: any,
        data: Partial<TLocal>,
        options?: Options<TRemote>,
    ): Promise<Either<NetworkError, TLocal>>;
}
