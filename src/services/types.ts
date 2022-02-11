import { Either } from "@sweet-monads/either";

import NetworkError from "../errors/NetworkError";

export type Options = {
    embed?: string[];
    match?: Record<string, any>;
};

export interface IRestApiService {
    getAll<TRemote extends object, TLocal extends object>(
        resourceName: string,
        options?: Options,
    ): Promise<Either<NetworkError, { data: TLocal[]; totalCount: number }>>;
    get<TRemote extends object, TLocal extends object>(
        resourceName: string,
        resourseId: any,
        options?: Options,
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
    ): Promise<Either<NetworkError, TLocal>>;
}
