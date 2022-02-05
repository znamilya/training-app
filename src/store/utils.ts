import { EntityEnvelope, HasError, HasStatus } from "./types";

export const wrapEntityEnvelope = <T>(data: T): EntityEnvelope<T> => ({
    status: "success",
    data,
    error: null,
});

export const unwrapEntityEnvelope = <T>(envelope: EntityEnvelope<T>): T => envelope.data;

export const isLoading = ({ status }: HasStatus): boolean => status === "loading";

export const hasError = ({ error }: HasError): boolean => Boolean(error);
