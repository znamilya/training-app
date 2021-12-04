import { useRouteParams } from "typesafe-routes/react-router";
import routes from "../../../routes";

import ProjectDetailsModule from "../../03_modules/ProjectDetails";
import MainLayout from "../../04_layouts/MainLayout";

const ProjectDetailsPage = () => {
    const { projectId } = useRouteParams(routes.project);

    return (
        <MainLayout title="Title">
            <ProjectDetailsModule projectId={projectId} />
        </MainLayout>
    );
};

export default ProjectDetailsPage;
