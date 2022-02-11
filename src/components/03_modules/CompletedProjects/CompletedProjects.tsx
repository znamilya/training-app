import { useLayoutEffect } from "react";

import { ProjectId } from "../../../enteties/project/types";
import { useAllCompletedProjects } from "../../../store/collections/allCompletedProjects";
import { useProject } from "../../../store/entities/projects";
import ProjectsList, { ProjectListItem } from "../../01_basic/ProjectsList";

/**
 * Displays a list of all completed projects.
 */
const CompletedProjectsModule = () => {
    const { data, isLoading, error, load } = useAllCompletedProjects();
    const { create: createProject } = useProject();

    useLayoutEffect(() => {
        load();
    }, [load]);

    if (isLoading) {
        return <h1 data-testid="all-projects-spinner">Loading...</h1>;
    }

    if (error) {
        return <h1 data-testid="all-projects-error">{error}</h1>;
    }

    return (
        <ProjectsList>
            {data.map((projectId) => (
                <ProjectListItemConnected projectId={projectId} key={projectId} />
            ))}
        </ProjectsList>
    );
};

const ProjectListItemConnected = ({ projectId }: { projectId: ProjectId }) => {
    const { data: project } = useProject(projectId);

    // FIXIT: return null
    if (!project) return <div>&nbsp;</div>;

    return <ProjectListItem id={project.id} title={project.title} />;
};

export default CompletedProjectsModule;
