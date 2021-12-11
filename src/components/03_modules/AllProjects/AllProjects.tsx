import { useEffect } from "react";

import { ProjectId } from "../../../enteties/project/types";
import useProjects from "../../../hooks/controllers/useProjects";
import ProjectsList, { ProjectListItem } from "../../01_basic/ProjectsList";

/**
 * Displays a list of all existing projects (but not removed or archived ones)
 */
const AllProjectsModule = () => {
    const { fetchAllProjects, createProject, selectAllProjectsIds, selectAllProjectsStatus } =
        useProjects();
    const allProjectsIds = selectAllProjectsIds();
    const status = selectAllProjectsStatus();

    useEffect(() => {
        fetchAllProjects();
    }, [fetchAllProjects]);

    if (status === "loading") {
        return <h1 data-testid="all-projects-spinner">Loading...</h1>;
    }

    if (status === "error") {
        return <h1 data-testid="all-projects-error">Oooops...</h1>;
    }

    return (
        <ProjectsList onProjectAdd={createProject}>
            {allProjectsIds.map((projectId) => (
                <ProjectListItemConnected projectId={projectId} key={projectId} />
            ))}
        </ProjectsList>
    );
};

const ProjectListItemConnected = ({ projectId }: { projectId: ProjectId }) => {
    const { selectProjectById } = useProjects();
    const project = selectProjectById(projectId);

    // FIXIT: return null
    if (!project) return <div>&nbsp;</div>;

    return <ProjectListItem id={project.id} title={project.title} />;
};

export default AllProjectsModule;
