import { ProjectId } from "../../../entities/project/types";
import { useAppSelector } from "../../../store/store";
import { selectors } from "../../../store/enteties/projects";

type ProjectDetailsModuleProps = {
    projectId: ProjectId;
};

/**
 * Displays info about project (its title, tasks, etc) with ability to edit it.
 */
const ProjectDetailsModule = ({ projectId }: ProjectDetailsModuleProps) => {
    const project = useAppSelector(selectors.selectById(projectId));

    if (!project) {
        // TODO: Handle absent project
        return null;
    }

    return <div>{project.title}</div>;
};

export default ProjectDetailsModule;
