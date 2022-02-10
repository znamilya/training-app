export const renameKeysWith = <T extends object, R extends object>(
    obj: T,
    fn: (key: string) => string,
): R => {
    return Object.entries(obj).reduce((acc, [key, value]) => {
        // @ts-ignore
        acc[fn(key)] = value;

        return acc;
    }, {} as R);
};
