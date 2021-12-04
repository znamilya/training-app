import InboxTasksModule from "../../03_modules/InboxTasks";
import MainLayout from "../../04_layouts/MainLayout";

const InboxTasksPage = () => {
    return (
        <MainLayout title="Inbox">
            <InboxTasksModule />
        </MainLayout>
    );
};

export default InboxTasksPage;
