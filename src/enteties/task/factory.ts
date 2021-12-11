import deepmerge from "deepmerge";
import faker from "faker";

import { Task } from "./task";

export const buildTask = (overrrides: Partial<Task> = {}): Task => {
    const defaultValue: Task = {
        id: faker.datatype.uuid(),
        title: faker.datatype.string(4),
        isComplete: false,
        isNextAction: false,
    };

    return deepmerge<Task>(defaultValue, overrrides);
};
