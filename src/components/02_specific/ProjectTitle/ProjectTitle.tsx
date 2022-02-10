import { memo } from "react";

import { ProjectId } from "../../../enteties/project/types";
import { useProject } from "../../../store/entities/projects";

export type ProjectTitleProps = {
    projectId: ProjectId;
};

const ProjectTitle = ({ projectId }: ProjectTitleProps) => {
    const { data: project } = useProject(projectId);

    if (!project) return null;

    return <span>{project.title}</span>;
};

export default memo(ProjectTitle);
