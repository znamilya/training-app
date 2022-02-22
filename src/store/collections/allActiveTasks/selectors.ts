import { RootState } from "../../store";
import { notEmpty } from "../../../utils/predicates";
import * as tasksEnteties from "../../entities/tasks";
import { Task } from "../../../enteties/task";

export const getSlice = (state: RootState) => state.collections.allActiveTasks;

export const getIds = (state: RootState) => getSlice(state).ids;

export const getStatus = (state: RootState) => getSlice(state).status;

export const selectAll = (state: RootState): Task[] =>
    getSlice(state)
        .ids.map((id) => tasksEnteties.selectors.selectById(id)(state)?.data)
        .filter(notEmpty);

export const selectCompletedCount = (state: RootState): number =>
    selectAll(state).filter((task) => task.isComplete).length;

export const selectTotalCount = (state: RootState): number => getSlice(state).totalCount;
