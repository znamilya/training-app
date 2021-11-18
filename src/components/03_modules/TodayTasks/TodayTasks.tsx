import { ProjectId } from "../../../entities/project/types";
import useTasksController from "../../../hooks/controllers/useTasksController/useTasksController";
import TasksList, { TasksListItem } from "../../01_basic/TasksList";
import NewTaskButton from "../../02_specific/NewTaskButton/NewTaskButton";

type TodayTasksModuleProps = {
    projectId: ProjectId;
};

/**
 * Display a list of the tasks that should be complete today
 */
const TodayTasksModule = ({ projectId }: TodayTasksModuleProps) => {
    const { getTasks, markAsComplete } = useTasksController(projectId);
    const tasks = getTasks();

    return (
        <>
            {tasks.length > 0 && (
                <TasksList onComplete={markAsComplete}>
                    {tasks.map((task) => (
                        <TasksListItem id={task.id}>
                            {task.title} {task.isComplete ? "x" : "-"}
                        </TasksListItem>
                    ))}
                </TasksList>
            )}
            <NewTaskButton projectId={projectId} />
        </>
    );
};

export default TodayTasksModule;
