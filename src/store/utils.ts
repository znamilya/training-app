import { AsyncThunkPayloadCreator, createAsyncThunk as cat } from "@reduxjs/toolkit";
import ProjectsService from "../services/ProjectsService";
import { EntityEnvelope, HasError, HasStatus } from "./types";

export const wrapEntityEnvelope = <T>(data: T): EntityEnvelope<T> => ({
    status: "success",
    data,
    error: null,
});

export const unwrapEntityEnvelope = <T>(envelope: EntityEnvelope<T> | null): T | null =>
    envelope?.data || null;

export const isLoading = (envelope: HasStatus | null): boolean => envelope?.status === "loading";

export const hasError = (envelope: HasError | null): boolean => Boolean(envelope?.error);

export const createAsyncThunk = <Returned, ThunkArg = void>(
    name: string,
    creator: AsyncThunkPayloadCreator<
        Returned,
        ThunkArg,
        {
            extra: {
                projectsService: ProjectsService;
            };
        }
    >,
) =>
    cat<
        Returned,
        ThunkArg,
        {
            extra: {
                projectsService: ProjectsService;
            };
        }
    >(name, creator);
