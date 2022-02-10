import { Task, TaskId } from "../../../enteties/task";
import type { RootState } from "../../store";
import { EntityEnvelope } from "../../types";

const getSlice = (state: RootState) => state.enteties.tasks;

export const selectById =
    (taskId: TaskId) =>
    (state: RootState): EntityEnvelope<Task> | null => {
        const project = getSlice(state)[taskId];

        return project || null;
    };
