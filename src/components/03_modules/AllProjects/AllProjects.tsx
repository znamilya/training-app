import ProjectsList, { ProjectListItem } from "../../01_basic/ProjectsList";
import { ProjectId } from "../../../entities/project/types";
import useProjects from "../../../hooks/controllers/useProjects";

/**
 * Displays a list of all existing projects (but not removed or archived ones)
 */
const AllProjectsModule = () => {
    const { selectAllProjects, createProject } = useProjects();
    const allProjects = selectAllProjects();

    return <AllProjectsList />;

    function AllProjectsList() {
        return (
            <ProjectsList onProjectAdd={createProject}>
                {allProjects.map((project) => (
                    <ProjectListItemConnected projectId={project.id} key={project.id} />
                ))}
            </ProjectsList>
        );
    }
};

const ProjectListItemConnected = ({ projectId }: { projectId: ProjectId }) => {
    const { selectProjectById } = useProjects();
    const project = selectProjectById(projectId);

    if (!project) return null;

    return <ProjectListItem id={project.id} title={project.title} />;
};

export default AllProjectsModule;
