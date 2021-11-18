import { ProjectId } from "../../../entities/project/types";
import { Task, TaskId } from "../../../entities/task/types";

type TasksController = {
    getTasks(): Task[];
    addTask(): void;
    markAsComplete(taskId: TaskId): void;
};

let fakeTasks: Task[] = [
    { id: 1, title: "Buy milk", isComplete: false, projectId: 1 },
    { id: 2, title: "Buy bread", isComplete: false, projectId: 1 },
    { id: 3, title: "Buy a guitar", isComplete: false, projectId: 2 },
    { id: 4, title: "Read the book", isComplete: false, projectId: 2 },
];

const useTasksController = (projectId: ProjectId): TasksController => {
    const getTasks = () => {
        return fakeTasks.filter((task) => task.projectId === projectId);
    };

    const addTask = () => {
        fakeTasks = [
            ...fakeTasks,
            { id: Math.random(), title: "A new task", isComplete: false, projectId: 2 },
        ];
    };

    const markAsComplete = (taskId: TaskId) => {
        const targetTask = fakeTasks.find((task) => task.id === taskId);

        if (targetTask) {
            targetTask.isComplete = true;
        }
    };

    return {
        getTasks,
        addTask,
        markAsComplete,
    };
};

export default useTasksController;
