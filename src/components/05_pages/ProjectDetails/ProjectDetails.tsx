import { useRouteParams } from "typesafe-routes/react-router";

import routes from "../../../routes";
import ProjectPageTitle from "../../02_specific/ProjectTitle";
import ProjectDetailsModule from "../../03_modules/ProjectDetails";
import MainLayout from "../../04_layouts/MainLayout";

const ProjectDetailsPage = () => {
    const { projectId } = useRouteParams(routes.project);

    return (
        <MainLayout title={<ProjectPageTitle projectId={projectId} />}>
            <ProjectDetailsModule projectId={projectId} />
        </MainLayout>
    );
};

export default ProjectDetailsPage;
