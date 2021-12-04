import TodayTasksModule from "../../03_modules/TodayTasks";
import MainLayout from "../../04_layouts/MainLayout";

const TodayTasksPage = () => {
    return (
        <MainLayout title="Today">
            <TodayTasksModule />
        </MainLayout>
    );
};

export default TodayTasksPage;
