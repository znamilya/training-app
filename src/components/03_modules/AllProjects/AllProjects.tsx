import * as allProjectsCollection from "../../../store/collections/allProjects";
import { useAppSelector } from "../../../store/store";

/**
 * Displays a list of all existing projects (not removed or archived ones)
 */
const AllProjectsModule = () => {
    const projects = useAppSelector(allProjectsCollection.selectors.selectAll);

    if (projects.length === 0) {
        // TODO: Replace with <EmptyCollection /> component
        return <div>No projects</div>;
    }

    return <section>{projects.map((project) => project.title).join(", ")}</section>;
};

export default AllProjectsModule;
