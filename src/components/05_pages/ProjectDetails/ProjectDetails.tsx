import { useRouteParams } from "typesafe-routes/react-router";
import routes from "../../../routes";

import ProjectDetailsModule from "../../03_modules/ProjectDetails";

const ProjectDetailsPage = () => {
    const { projectId } = useRouteParams(routes.project);

    return <ProjectDetailsModule projectId={projectId} />;
};

export default ProjectDetailsPage;
