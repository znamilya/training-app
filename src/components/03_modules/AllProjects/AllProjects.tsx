import * as allProjectsCollection from "../../../store/collections/allProjects";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import * as projectEnteties from "../../../store/enteties/projects";
import ProjectsList, { ProjectListItem } from "../../01_basic/ProjectsList";
import { ProjectId } from "../../../entities/project/types";
import { useMemo } from "react";

/**
 * Displays a list of all existing projects (but not removed or archived ones)
 */
const AllProjectsModule = () => {
    const projects = useAppSelector(allProjectsCollection.selectors.selectAll);
    const dispatch = useAppDispatch();

    const handleProjectAdd = (title: string) => {
        dispatch(
            projectEnteties.actions.create({
                title,
            }),
        );
    };

    return (
        <section>
            <ProjectsList onProjectAdd={handleProjectAdd}>
                {projects.map((project) => (
                    <ProjectListItemConnected projectId={project.id} />
                ))}
            </ProjectsList>
        </section>
    );
};

const ProjectListItemConnected = ({ projectId }: { projectId: ProjectId }) => {
    const projectSelector = useMemo(
        () => projectEnteties.selectors.selectById(projectId),
        [projectId],
    );
    const project = useAppSelector(projectSelector);

    if (!project) return null;

    return <ProjectListItem id={project.id} title={project.title} />;
};

export default AllProjectsModule;
