import { ProjectId } from "../../../entities/project/types";
import { RootState } from "../../store";

const getSlice = (state: RootState) => state.collections.tasksByProjects;

export const seletIds = (projectId: ProjectId) => (state: RootState) =>
    getSlice(state)[projectId].ids;

export const selectTotalCount =
    (projectId: ProjectId) =>
    (state: RootState): number =>
        getSlice(state)[projectId].totalCount;
