import React, { ReactNode } from "react";

import NewButton from "../NewButton";

import { ListStyled, ActionsStyled } from "./TasksList.styled";

export type TasksListProps = {
    children: ReactNode;
    onTaskAdd(taskTitle: string): void;
};

/**
 * Display a list of tasks with ability to add a new one.
 */
const TasksList = ({ children, onTaskAdd }: TasksListProps) => {
    const hasItems = React.Children.count(children) > 0;

    return (
        <>
            {hasItems ? <List /> : <EmptyMessage />}

            <ActionsStyled>
                <NewButton addButtonText="Add Task" onCreate={onTaskAdd} />
            </ActionsStyled>
        </>
    );

    function List() {
        return (
            <ListStyled spacing={1} component="ul">
                {children}
            </ListStyled>
        );
    }

    function EmptyMessage() {
        return <div>No tasks yet...</div>;
    }
};

export default TasksList;
