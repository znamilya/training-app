import React, { ReactNode } from "react";

import NewButton from "../NewButton";

import { ItemsStyled, ActionsStyled } from "./TasksList.styled";

export type TasksListProps = {
    children: ReactNode;
    onTaskAdd(taskTitle: string): void;
};

/**
 * Display a list of tasks with ability to add a new one.
 */
const TasksList = ({ children, onTaskAdd }: TasksListProps) => {
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

            <ActionsStyled>
                <NewButton addButtonText="Add Task" onCreate={onTaskAdd} />
            </ActionsStyled>
        </div>
    );
};

export default TasksList;
