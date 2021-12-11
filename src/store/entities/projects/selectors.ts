import type { Project, ProjectId } from "../../../enteties/project/types";
import { notEmpty } from "../../../utils/predicates";
import type { RootState } from "../../store";

import * as tasksEntities from "../tasks";

export const selectById =
    (projectId: ProjectId) =>
    (state: RootState): Project | null => {
        const project = state.enteties.projects[projectId];

        return project || null;
    };

export const selectActive = (state: RootState): Project[] => {
    return Object.values(state.enteties.projects).filter((project) => project.isActive);
};

export const selectUncompletedTasksCount =
    (projectId: ProjectId) =>
    (state: RootState): number => {
        const project = selectById(projectId)(state);

        if (!project) return 0;

        return project.tasks
            .map((taskId) => tasksEntities.selectors.selectById(taskId))
            .map((select) => select(state))
            .filter(notEmpty)
            .filter((task) => !task.isComplete).length;
    };
