import { IconButton } from "@mui/material";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";

import * as tasksEntity from "../../../../../store/enteties/tasks";

import { RootStyled } from "./TasksListItem.styled";
import { useAppSelector } from "../../../../../store/store";
import { TaskId } from "../../../../../entities/task/types";

type TasksListItemProps = {
    taskId: TaskId;
};

const TasksListItem = ({ taskId }: TasksListItemProps) => {
    const task = useAppSelector(tasksEntity.selectors.selectById(taskId));

    if (!task) return null;

    return (
        <RootStyled component="li" elevation={1}>
            {task.title}

            <IconButton
                sx={{ marginLeft: "auto" }}
                data-testid="task-list-item-complete-button"
                onClick={() => console.log("Complete: ", task.id)}
            >
                <CheckCircleOutlineRoundedIcon />
            </IconButton>
        </RootStyled>
    );
};

export default TasksListItem;
