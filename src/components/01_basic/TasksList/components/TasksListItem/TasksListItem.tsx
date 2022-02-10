import { memo } from "react";
import { Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import DeleteIcon from "@mui/icons-material/Delete";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

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
    isRemoving?: boolean;
    onComplete(taskId: TaskId, isChecked: boolean): void;
    onStart(taskId: TaskId): void;
    onStop(taskId: TaskId): void;
    onRemove(taskId: TaskId): void;
};

const TasksListItem = ({
    id,
    title,
    isComplete,
    isNextAction,
    isRemoving = false,
    onComplete,
    onStart,
    onStop,
    onRemove,
}: TasksListItemProps) => {
    const shouldDisableButtons = isRemoving;

    return (
        <RootStyled component="li" elevation={1}>
            <CheckboxStyled>
                <input
                    type="checkbox"
                    aria-label="Complete the task"
                    checked={isComplete}
                    disabled={shouldDisableButtons}
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
                    <LoadingButton
                        sx={{ minWidth: "auto" }}
                        disabled={shouldDisableButtons}
                        onClick={() => onStop(id)}
                    >
                        stop
                    </LoadingButton>
                ) : (
                    <LoadingButton
                        sx={{ minWidth: "auto" }}
                        disabled={shouldDisableButtons}
                        onClick={() => onStart(id)}
                    >
                        <PlayArrowIcon />
                    </LoadingButton>
                )}
                <LoadingButton
                    sx={{ minWidth: "auto" }}
                    loading={isRemoving}
                    disabled={shouldDisableButtons}
                    onClick={() => onRemove(id)}
                >
                    <DeleteIcon />
                </LoadingButton>
            </ActionsStyled>
        </RootStyled>
    );
};

export default memo(TasksListItem);
