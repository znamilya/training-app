import { isPlainObject } from "is-plain-object";

export const renameKeysWith = <T extends object, R extends object>(
    obj: T,
    fn: (key: string) => string,
): R => {
    return Object.entries(obj).reduce((acc, [key, value]) => {
        if (isPlainObject(value)) {
            // @ts-ignore
            acc[fn(key)] = renameKeysWith(value, fn);
        } else if (Array.isArray(value)) {
            // @ts-ignore
            acc[fn(key)] = value.map((item) =>
                isPlainObject(item) ? renameKeysWith(item, fn) : item,
            );
        } else {
            // @ts-ignore
            acc[fn(key)] = value;
        }

        return acc;
    }, {} as R);
};
