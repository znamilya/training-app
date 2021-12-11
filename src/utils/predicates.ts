export const notEmpty = <T>(x: T | null | undefined): x is T => x !== null && x !== undefined;

export const isString = (s: any): s is string => typeof s === "string";
