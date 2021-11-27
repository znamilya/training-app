import type { Project, ProjectId } from "../../../entities/project/types";
import type { RootState } from "../../store";

export const selectById =
    (projectId: ProjectId) =>
    (state: RootState): Project | null => {
        const project = state.enteties.projects[projectId];

        return project || null;
    };

export const selectActive = (state: RootState): Project[] => {
    return Object.values(state.enteties.projects).filter((project) => project.isActive);
};
