import { ProjectId } from "../../../entities/project/types";
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

export default ProjectTitle;
