import { memo } from "react";

import { TaskId } from "../../../enteties/task";
import useProjects from "../../../hooks/controllers/useProjects";
import TasksList from "../../01_basic/TasksList";
import NextActionItem from "../../02_specific/NextActionItem";

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
                    projectId: "today",
                    title,
                    isNextAction: true,
                })
            }
        >
            {todayTasksIds.map((taskId) => (
                <NextActionItem taskId={taskId} key={taskId} />
            ))}
        </TasksList>
    );
};

export default memo(TodayTasksModule);
