import { ReactNode, useContext } from "react";
import { IconButton } from "@mui/material";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";

import { AnyId } from "../../../../../types";
import TaskListContext from "../../context";

import { RootStyled } from "./TasksListItem.styled";

type TasksListItemProps = {
    id: AnyId;
    children: ReactNode;
};

const TasksListItem = ({ children, id }: TasksListItemProps) => {
    const { onComplete } = useContext(TaskListContext);

    return (
        <RootStyled component="li" elevation={1}>
            {children}

            <IconButton
                sx={{ marginLeft: "auto" }}
                data-testid="task-list-item-complete-button"
                onClick={() => onComplete(id)}
            >
                <CheckCircleOutlineRoundedIcon />
            </IconButton>
        </RootStyled>
    );
};

export default TasksListItem;
