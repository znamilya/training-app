import useInbox from "../../../hooks/controllers/useInbox";
import TasksList, { TasksListItem } from "../../01_basic/TasksList";

/**
 * Displays a list of all existing projects (not removed or archived ones)
 */
const InboxTasksModule = () => {
    const { createTask, selectAllTasksIds } = useInbox();
    const inboxTasksIds = selectAllTasksIds();

    return null;
    // return (
    //     <TasksList onTaskAdd={createTask}>
    //         {inboxTasksIds.map((taskId) => (
    //             <TasksListItem taskId={taskId} key={taskId} />
    //         ))}
    //     </TasksList>
    // );
};

export default InboxTasksModule;
