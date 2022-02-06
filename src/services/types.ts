import { Either } from "@sweet-monads/either";

import NetworkError from "../errors/NetworkError";

export interface IApiService {
    getAll<T = any>(
        resourceName: string,
    ): Promise<Either<NetworkError, { data: T[]; totalCount: number }>>;
    getById<T = any>(resourceName: string, resourseId: any): Promise<Either<NetworkError, T>>;
    insert<T = any>(resourceName: string, data: any): Promise<Either<NetworkError, T>>;
    remove<T = any>(resourceName: string, resourseId: any): Promise<Either<NetworkError, T>>;
}
