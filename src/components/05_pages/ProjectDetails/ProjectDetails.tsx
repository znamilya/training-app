import { useRouteParams } from "typesafe-routes/react-router";
import routes from "../../../routes";
import { selectors } from "../../../store/enteties/projects";
import { useAppSelector } from "../../../store/store";
import PageTitle from "../../01_basic/PageTitle";

import ProjectDetailsModule from "../../03_modules/ProjectDetails";

const ProjectDetailsPage = () => {
    const { projectId } = useRouteParams(routes.project);
    const project = useAppSelector(selectors.selectById(projectId));

    if (!project) {
        // TODO: Handle absent project
        return null;
    }

    return (
        <section>
            <PageTitle>{project.title}</PageTitle>

            <ProjectDetailsModule projectId={projectId} />
        </section>
    );
};

export default ProjectDetailsPage;
