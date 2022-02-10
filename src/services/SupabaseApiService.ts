import { right, left } from "@sweet-monads/either";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

import NetworkError from "../errors/NetworkError";
import { IRestApiService } from "./types";
import { camelCase, snakeCase } from "change-case";
import { renameKeysWith } from "../utils/object";

type ApiServiceParams = {
    url: string;
};

type SupaOptions = {
    select?: string;
    match?: Record<string, any>;
};

class SupabaseApiService implements IRestApiService {
    readonly #supabase: SupabaseClient;

    constructor({ url }: ApiServiceParams) {
        this.#supabase = createClient(
            url,
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzkxNTY4NywiZXhwIjoxOTU5NDkxNjg3fQ.8Ow5rZNaNAw4c8LU0DjgFGVdov07K-7gYtgpn6CbOjk",
        );
    }

    async getAll<TRemote extends object, TLocal extends object>(
        resourceName: string,
        options: SupaOptions = {},
    ) {
        const { data, error, status, count } = await this.#supabase
            .from<TRemote>(resourceName)
            .select(options.select || "*", { count: "exact" })
            .match(options.match || {});

        if (error) {
            return left(new NetworkError(error.message, status));
        }

        if (data) {
            const localData = data.map((obj) => this.#normalizeKeys<TRemote, TLocal>(obj));

            return right({ data: localData, totalCount: count || data.length });
        }

        return right({ data: [] as TLocal[], totalCount: 0 });
    }

    async get<TRemote extends object, TLocal extends object>(
        resourceName: string,
        resourseId: any,
        options: SupaOptions = {},
    ) {
        const { data, error, status } = await this.#supabase
            .from<TRemote>(resourceName)
            .select(options.select)
            .match({
                id: resourseId,
            })
            .single();

        if (!data || error) {
            return left(new NetworkError(error?.message, status));
        }

        return right(this.#normalizeKeys<TRemote, TLocal>(data));
    }

    async insert<TRemote extends object, TLocal extends object>(
        resourceName: string,
        data: Partial<TLocal>,
    ) {
        const {
            data: resource,
            error,
            status,
        } = await this.#supabase
            .from<TRemote>(resourceName)
            .insert([this.#prepareKeys<Partial<TLocal>, Partial<TRemote>>(data)])
            .single();

        if (!resource || error) {
            return left(new NetworkError(error?.message, status));
        }

        return right(this.#normalizeKeys<TRemote, TLocal>(resource));
    }

    async remove<TRemote extends object, TLocal extends object>(
        resourceName: string,
        resourseId: any,
    ) {
        const {
            data: resource,
            error,
            status,
        } = await this.#supabase
            .from<TRemote>(resourceName)
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

        return right(this.#normalizeKeys<TRemote, TLocal>(resource));
    }

    async update<TRemote extends object, TLocal extends object>(
        resourceName: string,
        resourseId: any,
        data: Partial<TLocal>,
    ) {
        const {
            data: resource,
            status,
            error,
        } = await this.#supabase
            .from<TRemote>(resourceName)
            .update(this.#prepareKeys<Partial<TLocal>, Partial<TRemote>>(data))
            .match({ id: resourseId })
            .single();

        if (!resource || error) {
            return left(new NetworkError(error?.message, status));
        }

        return right(this.#normalizeKeys<TRemote, TLocal>(resource));
    }

    #prepareKeys<From extends object, To extends object>(data: From): To {
        return renameKeysWith<From, To>(data, snakeCase);
    }

    #normalizeKeys<From extends object, To extends object>(data: From): To {
        return renameKeysWith<From, To>(data, camelCase);
    }
}

export default SupabaseApiService;
