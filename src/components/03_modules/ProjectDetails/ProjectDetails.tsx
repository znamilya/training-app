import { ProjectId } from "../../../entities/project/types";

type ProjectDetailsModuleProps = {
    projectId: ProjectId;
};

/**
 * Displays info about project (its title, tasks, etc) with ability to edit it.
 */
const ProjectDetailsModule = ({ projectId }: ProjectDetailsModuleProps) => {
    return <section>ProjectDetails: {projectId}</section>;
};

export default ProjectDetailsModule;
