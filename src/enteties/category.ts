import { Colors } from "../types";

export type CategoryId = string;

export type Category = {
    id: CategoryId;
    title: string;
    // color: typeof Colors[keyof typeof Colors];
};
