import * as allTodayTasksCollection from "../../../store/collections/allTodayTasks";
import { useAppSelector } from "../../../store/store";
import TasksList, { TasksListItem } from "../../01_basic/TasksList";

/**
 * Display a list of the tasks that should be complete today
 */
const TodayTasksModule = () => {
    const todayTasksIds = useAppSelector(allTodayTasksCollection.selectors.seletIds);

    return (
        <TasksList onTaskAdd={() => {}}>
            {todayTasksIds.map((taskId) => (
                <TasksListItem taskId={taskId} key={taskId} />
            ))}
        </TasksList>
    );
};

export default TodayTasksModule;
