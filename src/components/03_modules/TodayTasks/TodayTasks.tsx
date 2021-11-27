import * as allInboxTasksCollection from "../../../store/collections/allInboxTasks";
import { useAppSelector } from "../../../store/store";
import TasksList, { TasksListItem } from "../../02_specific/TasksList";

/**
 * Display a list of the tasks that should be complete today
 */
const TodayTasksModule = () => {
    const todayTasksIds = useAppSelector(allInboxTasksCollection.selectors.seletIds);

    return (
        <TasksList>
            {todayTasksIds.map((taskId) => (
                <TasksListItem taskId={taskId} key={taskId} />
            ))}
        </TasksList>
    );
};

export default TodayTasksModule;
