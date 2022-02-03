import { Project, ProjectId } from "../../../enteties/project/types";
import { RootState } from "../../store";

import { notEmpty } from "../../../utils/predicates";
import * as projectsEnteties from "../../entities/projects";

export const getSlice = (state: RootState) => state.collections.allProjects;

export const getIds = (state: RootState) => getSlice(state).ids;

export const getStatus = (state: RootState) => getSlice(state).status;

export const selectAll = (state: RootState): Project[] =>
    getSlice(state)
        .ids.map((id) => projectsEnteties.selectors.selectById(id)(state))
        .filter(notEmpty);

export const selectAllActiveIds = (state: RootState): ProjectId[] =>
    selectAll(state)
        .filter((project) => project.isActive)
        .map(({ id }) => id);

export const selectTotalCount = (state: RootState): number => getSlice(state).totalCount;
