import * as allInboxTasks from "../../../store/collections/allInboxTasks";
import { useAppSelector } from "../../../store/store";
import TasksList, { TasksListItem } from "../../01_basic/TasksList";

/**
 * Displays a list of all existing projects (not removed or archived ones)
 */
const InboxTasksModule = () => {
    const inboxTasksIds = useAppSelector(allInboxTasks.selectors.seletIds);

    return (
        <TasksList
            onTaskAdd={(title) => {
                console.log("Add inbox task: ", title);
            }}
        >
            {inboxTasksIds.map((taskId) => (
                <TasksListItem taskId={taskId} key={taskId} />
            ))}
        </TasksList>
    );
};

export default InboxTasksModule;
