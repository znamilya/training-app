import React, { ReactNode } from "react";

import { RootStyled } from "./TasksList.styled";

export type TasksListProps = {
    children: ReactNode;
    addButton?: ReactNode;
};

/**
 * Display a list of tasks. Optionally can render a button to add a new task
 */
const TasksList = ({ children, addButton }: TasksListProps) => {
    const hasNoItems = React.Children.count(children) === 0;

    return (
        <RootStyled spacing={1} component="ul">
            {hasNoItems ? "No tasks yet..." : children}
            {addButton && <div>{addButton}</div>}
        </RootStyled>
    );
};

export default TasksList;
