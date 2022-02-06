import type { Project, ProjectId } from "../../../enteties/project/types";
import { notEmpty } from "../../../utils/predicates";
import type { RootState } from "../../store";
import { EntityEnvelope } from "../../types";

import * as tasksEntities from "../tasks";

export const selectById =
    (projectId: ProjectId) =>
    (state: RootState): EntityEnvelope<Project> | null => {
        const projectEnvelope = state.enteties.projects[projectId];

        return projectEnvelope || null;
    };

export const selectActive = (state: RootState): EntityEnvelope<Project>[] => {
    return Object.values(state.enteties.projects).filter(
        (projectEnvelope) => projectEnvelope.data?.isActive || false,
    );
};

export const selectUncompletedTasksCount =
    (projectId: ProjectId) =>
    (state: RootState): number => {
        const projectEnvelope = selectById(projectId)(state);

        if (!projectEnvelope) return 0;

        return (projectEnvelope.data?.tasks || [])
            .map((taskId) => tasksEntities.selectors.selectById(taskId))
            .map((select) => select(state))
            .filter(notEmpty)
            .filter((task) => !task.isComplete).length;
    };
