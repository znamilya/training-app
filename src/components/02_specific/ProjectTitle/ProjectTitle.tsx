import { memo } from "react";

import { ProjectId } from "../../../enteties/project/types";
import useProjects from "../../../hooks/controllers/useProjects";
import { unwrapEntityEnvelope } from "../../../store/utils";

export type ProjectTitleProps = {
    projectId: ProjectId;
};

const ProjectTitle = ({ projectId }: ProjectTitleProps) => {
    const { selectProjectById } = useProjects();
    const projectEnvelope = selectProjectById(projectId);

    if (!projectEnvelope) return null;

    const project = unwrapEntityEnvelope(projectEnvelope);

    return <span>{project.title}</span>;
};

export default memo(ProjectTitle);
