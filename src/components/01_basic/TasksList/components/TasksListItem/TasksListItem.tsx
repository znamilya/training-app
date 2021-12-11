import { memo } from "react";
import { Button } from "@mui/material";

import { TaskId } from "../../../../../enteties/task";

import {
    RootStyled,
    CheckboxStyled,
    TitleWrapperStyled,
    TitleStyled,
    ActionsStyled,
} from "./TasksListItem.styled";

export type TasksListItemProps = {
    id: TaskId;
    title: string;
    isComplete: boolean;
    isNextAction: boolean;
    onComplete(taskId: TaskId, isChecked: boolean): void;
    onStart(taskId: TaskId): void;
    onStop(taskId: TaskId): void;
    onEdit(taskId: TaskId): void;
    onRemove(taskId: TaskId): void;
};

const TasksListItem = ({
    id,
    title,
    isComplete,
    isNextAction,
    onComplete,
    onStart,
    onStop,
    onEdit,
    onRemove,
}: TasksListItemProps) => {
    return (
        <RootStyled component="li" elevation={1}>
            <CheckboxStyled>
                <input
                    type="checkbox"
                    aria-label="Complete the task"
                    checked={isComplete}
                    onChange={(event) => {
                        onComplete(id, event.target.checked);
                    }}
                />
            </CheckboxStyled>

            <TitleWrapperStyled>
                <TitleStyled data-testid="tasks-list-item-title">
                    {isComplete ? <del>{title}</del> : title}
                </TitleStyled>
            </TitleWrapperStyled>

            <ActionsStyled>
                {isComplete ? null : isNextAction ? (
                    <Button onClick={() => onStop(id)}>stop</Button>
                ) : (
                    <Button onClick={() => onStart(id)}>start</Button>
                )}
                <Button onClick={() => onEdit(id)}>edit</Button>
                <Button onClick={() => onRemove(id)}>remove</Button>
            </ActionsStyled>
        </RootStyled>
    );
};

export default memo(TasksListItem);
