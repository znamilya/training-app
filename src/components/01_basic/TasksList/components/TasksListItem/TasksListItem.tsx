import { ChangeEvent, memo, ReactNode } from "react";
import { LoadingButton } from "@mui/lab";
import DeleteIcon from "@mui/icons-material/Delete";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

import { TaskId } from "../../../../../enteties/task";

import {
    RootStyled,
    InnerStyled,
    CheckboxStyled,
    TitleWrapperStyled,
    TitleStyled,
    ActionsStyled,
    ExtraStyled,
} from "./TasksListItem.styled";

export type TasksListItemProps = {
    id: TaskId;
    title: string;
    extra?: ReactNode;
    isComplete: boolean;
    isNextAction: boolean;
    isRemoving?: boolean;
    isStarting?: boolean;
    isStoping?: boolean;
    onComplete(taskId: TaskId, isChecked: boolean): void;
    onStart(taskId: TaskId): void;
    onStop(taskId: TaskId): void;
    onRemove(taskId: TaskId): void;
};

const TasksListItem = ({
    id,
    title,
    extra,
    isComplete,
    isNextAction,
    isRemoving = false,
    isStarting = false,
    isStoping = false,
    onComplete,
    onStart,
    onStop,
    onRemove,
}: TasksListItemProps) => {
    const shouldDisableButtons = isRemoving || isStarting || isStoping;

    return (
        <RootStyled elevation={1}>
            <InnerStyled>
                <CheckboxStyled
                    aria-label="Complete the task"
                    checked={isComplete}
                    disabled={shouldDisableButtons}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        onComplete(id, event.target.checked);
                    }}
                />

                <TitleWrapperStyled>
                    <TitleStyled data-testid="tasks-list-item-title">
                        {isComplete ? <del>{title}</del> : title}
                    </TitleStyled>
                </TitleWrapperStyled>

                <ActionsStyled>
                    {isNextAction ? (
                        <LoadingButton
                            sx={{ minWidth: "auto" }}
                            size="small"
                            loading={isStoping}
                            disabled={shouldDisableButtons}
                            onClick={() => onStop(id)}
                        >
                            <PauseIcon fontSize="small" />
                        </LoadingButton>
                    ) : (
                        <LoadingButton
                            sx={{ minWidth: "auto" }}
                            size="small"
                            loading={isStarting}
                            disabled={shouldDisableButtons}
                            onClick={() => onStart(id)}
                        >
                            <PlayArrowIcon fontSize="small" />
                        </LoadingButton>
                    )}
                    <LoadingButton
                        sx={{ minWidth: "auto" }}
                        loading={isRemoving}
                        size="small"
                        disabled={shouldDisableButtons}
                        onClick={() => onRemove(id)}
                    >
                        <DeleteIcon fontSize="small" />
                    </LoadingButton>
                </ActionsStyled>
            </InnerStyled>
            {extra && <ExtraStyled>{extra}</ExtraStyled>}
        </RootStyled>
    );
};

export default memo(TasksListItem);
