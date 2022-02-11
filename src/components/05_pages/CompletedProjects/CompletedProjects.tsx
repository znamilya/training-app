import CompletedProjectsModule from "../../03_modules/CompletedProjects";
import MainLayout from "../../04_layouts/MainLayout";

const CompletedProjectsPage = () => {
    return (
        <MainLayout title="Completed Projects">
            <CompletedProjectsModule />
        </MainLayout>
    );
};

export default CompletedProjectsPage;
