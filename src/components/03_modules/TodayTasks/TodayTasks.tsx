import { Typography } from "@mui/material";
import { memo, useEffect, useLayoutEffect } from "react";
import { NavLink } from "typesafe-routes/react-router";
import { TaskId } from "../../../enteties/task";
import routes from "../../../routes";

import { useAllActiveTasks } from "../../../store/collections/allActiveTasks";
import { useProject } from "../../../store/entities/projects";
import { useTask } from "../../../store/entities/tasks";
import TasksList, { TasksListItem } from "../../01_basic/TasksList";

/**
 * Display a list of the tasks that should be completed today
 */
const TodayTasksModule = () => {
    const { data, load, isStale, isLoading, error } = useAllActiveTasks();

    useLayoutEffect(() => {
        load();
    }, [load]);

    if (isLoading) {
        return <h1 data-testid="all-projects-spinner">Loading...</h1>;
    }

    if (error) {
        return <h1 data-testid="all-projects-error">{error}</h1>;
    }

    return (
        <TasksList onTaskAdd={() => {}}>
            {data.map((taskId) => (
                <TaskListItemConnected taskId={taskId} key={taskId} />
            ))}
        </TasksList>
    );
};

const TaskListItemConnected = ({ taskId }: { taskId: TaskId }) => {
    const {
        data: task,
        isRemoving,
        isStarting,
        isStoping,
        remove,
        complete,
        start,
        stop,
    } = useTask(taskId);
    const { data: project } = useProject(task?.projectId);

    if (!task) return null;

    return (
        <TasksListItem
            id={taskId}
            title={task.title}
            extra={
                project ? (
                    <Typography
                        variant="body2"
                        component={NavLink}
                        to={routes.project({ projectId: project.id })}
                    >
                        {project.title}
                    </Typography>
                ) : undefined
            }
            isComplete={task.isComplete}
            isNextAction={task.isNextAction}
            isRemoving={isRemoving}
            isStarting={isStarting}
            isStoping={isStoping}
            onComplete={complete}
            onStart={start}
            onStop={stop}
            onRemove={remove}
            key={taskId}
        />
    );
};

export default memo(TodayTasksModule);
