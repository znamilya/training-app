import axios, { AxiosInstance } from "axios";
import { right, left, Either } from "@sweet-monads/either";

import NetworkError from "../errors/NetworkError";
import { IApiService } from "./types";

type ApiServiceParams = {
    url: string;
};

class ApiService implements IApiService {
    readonly #axios: AxiosInstance;

    constructor({ url }: ApiServiceParams) {
        this.#axios = axios.create({
            baseURL: url,
        });
    }

    async getAll<T = any>(resourceName: string) {
        try {
            const response = await this.#axios.get<T[]>(`/${resourceName}`);

            return right(response.data);
        } catch (error) {
            return this.handleError(error);
        }
    }

    async getById<T = any>(resourceName: string, id: any) {
        try {
            const response = await this.#axios.get<T>(`/${resourceName}/${id}`);

            return right(response.data);
        } catch (error) {
            return this.handleError(error);
        }
    }

    private handleError(error: unknown): Either<NetworkError, never> {
        if (axios.isAxiosError(error) && error.response) {
            return left(new NetworkError(error.message, error.response.status));
        }

        if (error instanceof Error) {
            return left(new NetworkError(error.message));
        }

        return left(new NetworkError());
    }
}

export default ApiService;
