export const includesWithProp = <T extends Record<string, any>[]>(
    array: T,
    prop: string,
    value: any,
) => {
    return array.some((item) => item[prop] === value);
};
