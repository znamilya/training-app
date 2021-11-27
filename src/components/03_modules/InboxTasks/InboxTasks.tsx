import * as allInboxTasks from "../../../store/collections/allInboxTasks";
import { useAppSelector } from "../../../store/store";
import TasksList, { TasksListItem } from "../../02_specific/TasksList";
import NewInboxTaskButton from "../../02_specific/NewInboxTaskButton";

/**
 * Displays a list of all existing projects (not removed or archived ones)
 */
const InboxTasksModule = () => {
    const inboxTasksIds = useAppSelector(allInboxTasks.selectors.seletIds);

    return (
        <TasksList addButton={<NewInboxTaskButton />}>
            {inboxTasksIds.map((taskId) => (
                <TasksListItem taskId={taskId} key={taskId} />
            ))}
        </TasksList>
    );
};

export default InboxTasksModule;
