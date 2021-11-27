import { Project } from "../../../entities/project/types";
import { RootState } from "../../store";

import { notEmpty } from "../../../utils/predicates";
import * as projectsEnteties from "../../enteties/projects";

const getSlice = (state: RootState) => state.collections.allProjects;

export const selectAll = (state: RootState): Project[] =>
    getSlice(state)
        .ids.map((id) => projectsEnteties.selectors.selectById(id)(state))
        .filter(notEmpty);

export const selectTotalCount = (state: RootState): number => getSlice(state).totalCount;
