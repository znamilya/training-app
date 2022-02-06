import axios, { AxiosInstance } from "axios";
import { right, left, Either } from "@sweet-monads/either";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

import NetworkError from "../errors/NetworkError";
import { IApiService } from "./types";

type ApiServiceParams = {
    url: string;
};

class ApiService implements IApiService {
    readonly #axios: AxiosInstance;
    readonly #supabase: SupabaseClient;

    constructor({ url }: ApiServiceParams) {
        this.#axios = axios.create({
            baseURL: url,
        });

        this.#supabase = createClient(
            url,
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzkxNTY4NywiZXhwIjoxOTU5NDkxNjg3fQ.8Ow5rZNaNAw4c8LU0DjgFGVdov07K-7gYtgpn6CbOjk",
        );
    }

    async getAll<T = any>(resourceName: string) {
        const { data, error, status, count } = await this.#supabase
            .from<T>(resourceName)
            .select("*", { count: "exact" });

        if (error) {
            return left(new NetworkError(error.message, status));
        }

        if (data) {
            return right({ data, totalCount: count || data.length });
        }

        return right({ data: [], totalCount: 0 });
    }

    async getById<T = any>(resourceName: string, resourseId: any) {
        const { data, error, status } = await this.#supabase
            .from<T>(resourceName)
            .select()
            .match({
                id: resourseId,
            })
            .single();

        if (!data || error) {
            return left(new NetworkError(error?.message, status));
        }

        return right(data);
    }

    async insert<T = any>(resourceName: string, data: Partial<T>) {
        const {
            data: resource,
            error,
            status,
        } = await this.#supabase.from<T>(resourceName).insert([data]).single();

        if (!resource || error) {
            return left(new NetworkError(error?.message, status));
        }

        return right(resource);
    }

    async remove<T extends any>(resourceName: string, resourseId: any) {
        const {
            data: resource,
            error,
            status,
        } = await this.#supabase
            .from<T>(resourceName)
            .delete({
                returning: "representation",
            })
            .match({
                id: resourseId,
            })
            .single();

        if (!resource || error) {
            return left(new NetworkError(error?.message, status));
        }

        return right(resource);
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
