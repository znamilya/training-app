import { memo } from "react";

import { ProjectId } from "../../../enteties/project/types";
import useProjects from "../../../hooks/controllers/useProjects";

export type ProjectTitleProps = {
    projectId: ProjectId;
};

const ProjectTitle = ({ projectId }: ProjectTitleProps) => {
    const { selectProjectById } = useProjects();
    const project = selectProjectById(projectId);

    if (!project) return null;

    return <span>{project.title}</span>;
};

export default memo(ProjectTitle);
