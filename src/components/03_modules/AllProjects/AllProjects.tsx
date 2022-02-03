import { useEffect } from "react";

import { ProjectId } from "../../../enteties/project/types";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import * as allProjectsCollection from "../../../store/collections/allProjects";
import * as projectEnteties from "../../../store/entities/projects";
import ProjectsList, { ProjectListItem } from "../../01_basic/ProjectsList";

/**
 * Displays a list of all existing projects (but not removed or archived ones)
 */
const AllProjectsModule = () => {
    const dispatch = useAppDispatch();
    const allProjectsEnvelope = useAppSelector(allProjectsCollection.selectors.getSlice);

    useEffect(() => {
        dispatch(allProjectsCollection.actions.load());
    }, [dispatch]);

    if (allProjectsEnvelope.status === "loading") {
        return <h1 data-testid="all-projects-spinner">Loading...</h1>;
    }

    if (allProjectsEnvelope.status === "error") {
        return <h1 data-testid="all-projects-error">Oooops...</h1>;
    }

    return (
        <ProjectsList onProjectAdd={(title) => dispatch(projectEnteties.actions.create({ title }))}>
            {allProjectsEnvelope.ids.map((projectId) => (
                <ProjectListItemConnected projectId={projectId} key={projectId} />
            ))}
        </ProjectsList>
    );
};

const ProjectListItemConnected = ({ projectId }: { projectId: ProjectId }) => {
    const project = useAppSelector(projectEnteties.selectors.selectById(projectId));

    // FIXIT: return null
    if (!project) return <div>&nbsp;</div>;

    return <ProjectListItem id={project.id} title={project.title} />;
};

export default AllProjectsModule;
