import { TaskId } from "../../../entities/task/types";
import useProjects from "../../../hooks/controllers/useProjects";
import TasksList, { TasksListItem } from "../../01_basic/TasksList";

/**
 * Display a list of the tasks that should be completed today
 */
const TodayTasksModule = () => {
    const { createTask, selectNextActionTasks } = useProjects();
    const todayTasksIds: TaskId[] = selectNextActionTasks();

    return (
        <TasksList
            onTaskAdd={(title) =>
                createTask({
                    projectId: "1-orphans",
                    title,
                    isNextAction: true,
                })
            }
        >
            {todayTasksIds.map((taskId) => (
                <TasksListItem taskId={taskId} key={taskId} />
            ))}
        </TasksList>
    );
};

export default TodayTasksModule;
