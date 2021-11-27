import * as allProjectsCollection from "../../../store/collections/allProjects";
import { useAppSelector } from "../../../store/store";
import ProjectsList, { ProjectListItem } from "../../01_basic/ProjectsList";

/**
 * Displays a list of all existing projects (not removed or archived ones)
 */
const AllProjectsModule = () => {
    const projects = useAppSelector(allProjectsCollection.selectors.selectAll);

    return (
        <section>
            <ProjectsList>
                {projects.map((project) => (
                    <ProjectListItem projectId={project.id} />
                ))}
            </ProjectsList>
        </section>
    );
};

export default AllProjectsModule;
