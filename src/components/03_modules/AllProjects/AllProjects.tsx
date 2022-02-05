import { useLayoutEffect } from "react";

import { ProjectId } from "../../../enteties/project/types";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import * as allProjectsCollection from "../../../store/collections/allProjects";
import * as projectEnteties from "../../../store/entities/projects";
import { hasError, isLoading, unwrapEntityEnvelope } from "../../../store/utils";
import ProjectsList, { ProjectListItem } from "../../01_basic/ProjectsList";

/**
 * Displays a list of all existing projects (but not removed or archived ones)
 */
const AllProjectsModule = () => {
    const dispatch = useAppDispatch();
    const allProjectsEnvelope = useAppSelector(allProjectsCollection.selectors.getSlice);

    useLayoutEffect(() => {
        dispatch(allProjectsCollection.actions.load());
    }, [dispatch]);

    if (isLoading(allProjectsEnvelope)) {
        return <h1 data-testid="all-projects-spinner">Loading...</h1>;
    }

    if (hasError(allProjectsEnvelope)) {
        return <h1 data-testid="all-projects-error">Oooops...</h1>;
    }

    return (
        <ProjectsList
            onProjectAdd={(title, onSuccess, onError) =>
                dispatch(projectEnteties.actions.create({ title, onSuccess, onError }))
            }
        >
            {allProjectsEnvelope.ids.map((projectId) => (
                <ProjectListItemConnected projectId={projectId} key={projectId} />
            ))}
        </ProjectsList>
    );
};

const ProjectListItemConnected = ({ projectId }: { projectId: ProjectId }) => {
    const projectEnvelope = useAppSelector(projectEnteties.selectors.selectById(projectId));

    // FIXIT: return null
    if (!projectEnvelope) return <div>&nbsp;</div>;

    const project = unwrapEntityEnvelope(projectEnvelope);

    return <ProjectListItem id={project.id} title={project.title} />;
};

export default AllProjectsModule;
