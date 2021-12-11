import { Project } from "../../../enteties/project/types";
import { RootState } from "../../store";

import { notEmpty } from "../../../utils/predicates";
import * as projectsEnteties from "../../entities/projects";

const getSlice = (state: RootState) => state.collections.allInboxTasks;

export const selectAll = (state: RootState): Project[] =>
    getSlice(state)
        .ids.map((id) => projectsEnteties.selectors.selectById(id)(state))
        .filter(notEmpty);

export const seletIds = (state: RootState) => getSlice(state).ids;

export const selectTotalCount = (state: RootState): number => getSlice(state).totalCount;
