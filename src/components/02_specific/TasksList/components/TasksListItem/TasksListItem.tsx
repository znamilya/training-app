import { IconButton } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import * as taskEntities from "../../../../../store/enteties/tasks";

import { RootStyled } from "./TasksListItem.styled";
import { useAppDispatch, useAppSelector } from "../../../../../store/store";
import { TaskId } from "../../../../../entities/task/types";

type TasksListItemProps = {
    taskId: TaskId;
};

const TasksListItem = ({ taskId }: TasksListItemProps) => {
    const task = useAppSelector(taskEntities.selectors.selectById(taskId));
    const dispatch = useAppDispatch();

    if (!task) return null;

    return (
        <RootStyled component="li" elevation={1}>
            {task.title}

            {task.isComplete ? (
                <IconButton
                    sx={{ marginLeft: "auto" }}
                    data-testid="task-list-item-complete-button"
                    onClick={() => dispatch(taskEntities.actions.uncomplete(taskId))}
                >
                    <CheckCircleIcon />
                </IconButton>
            ) : (
                <IconButton
                    sx={{ marginLeft: "auto" }}
                    data-testid="task-list-item-complete-button"
                    onClick={() => dispatch(taskEntities.actions.complete(taskId))}
                >
                    <CheckCircleOutlineIcon />
                </IconButton>
            )}
        </RootStyled>
    );
};

export default TasksListItem;
