import { ReactNode } from "react";

import TaskListContext from "./context";
import { RootStyled } from "./TasksList.styled";

export type TasksListProps = {
    children: ReactNode;
    onComplete(taskId: number): void;
};

const TasksList = ({ children, onComplete }: TasksListProps) => {
    return (
        <TaskListContext.Provider value={{ onComplete }}>
            <RootStyled spacing={1} component="ul">
                {children}
            </RootStyled>
        </TaskListContext.Provider>
    );
};

export default TasksList;
