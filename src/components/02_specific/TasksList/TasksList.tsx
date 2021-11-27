import React, { ReactNode } from "react";

import { ItemsStyled, ActionsStyled } from "./TasksList.styled";

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
        <div>
            {hasNoItems ? (
                "No tasks yet..."
            ) : (
                <ItemsStyled spacing={1} component="ul">
                    {children}
                </ItemsStyled>
            )}

            {addButton && <ActionsStyled>{addButton}</ActionsStyled>}
        </div>
    );
};

export default TasksList;
