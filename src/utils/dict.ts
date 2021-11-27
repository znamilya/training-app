type AnyDict = Record<any, any>;

export const size = (dict: AnyDict): number => {
    return Object.keys(dict).length;
};

export const toArray = <T extends AnyDict>(dict: T): T[number][] => {
    return Object.values(dict);
};
