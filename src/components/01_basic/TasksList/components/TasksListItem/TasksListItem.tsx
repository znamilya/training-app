import { IconButton } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import InnerHTML from "dangerously-set-html-content";

import * as taskEntities from "../../../../../store/enteties/tasks";

import { RootStyled, CheckboxStyled, TitleStyled, ActionsStyled } from "./TasksListItem.styled";
import { useAppDispatch } from "../../../../../store/store";
import { TaskId } from "../../../../../entities/task/types";
import useProjects from "../../../../../hooks/controllers/useProjects";

type TasksListItemProps = {
    taskId: TaskId;
};

const TasksListItem = ({ taskId }: TasksListItemProps) => {
    const { renameTask, removeTask, selectTaskById } = useProjects();
    const task = selectTaskById(taskId);
    const dispatch = useAppDispatch();

    if (!task) return null;

    return (
        <RootStyled component="li" elevation={1}>
            <CheckboxStyled>
                {task.isComplete ? <UncompleteButton /> : <CompleteButton />}
            </CheckboxStyled>

            <TitleStyled>
                {task.isComplete ? (
                    <del>
                        <InnerHTML html={task.title} />
                    </del>
                ) : (
                    <InnerHTML html={task.title} />
                )}
            </TitleStyled>

            <ActionsStyled>
                {task.isComplete ? null : task.isNextAction ? <StopButton /> : <StartButton />}
                <EditButton />
                <RemoveButton />
            </ActionsStyled>
            <script>alert("123")</script>
        </RootStyled>
    );

    function EditButton() {
        const handleRename = () => {
            const newTitle = prompt("New title");

            if (newTitle) {
                renameTask(taskId, newTitle);
            }
        };

        return (
            <IconButton sx={{ marginLeft: "auto" }} onClick={handleRename}>
                <EditIcon />
            </IconButton>
        );
    }

    function StartButton() {
        return (
            <IconButton
                sx={{ marginLeft: "auto" }}
                onClick={() => dispatch(taskEntities.actions.schedule(taskId))}
            >
                <PlayArrowIcon />
            </IconButton>
        );
    }

    function StopButton() {
        return (
            <IconButton
                sx={{ marginLeft: "auto" }}
                onClick={() => dispatch(taskEntities.actions.unschedule(taskId))}
            >
                <PauseIcon />
            </IconButton>
        );
    }

    function RemoveButton() {
        return (
            <IconButton
                sx={{ marginLeft: "auto" }}
                onClick={() => removeTask(taskId, task?.projectId)}
            >
                <DeleteIcon />
            </IconButton>
        );
    }

    function UncompleteButton() {
        return (
            <IconButton
                sx={{ marginLeft: "auto" }}
                onClick={() => dispatch(taskEntities.actions.uncomplete(taskId))}
            >
                <CheckCircleIcon />
            </IconButton>
        );
    }

    function CompleteButton() {
        return (
            <IconButton
                sx={{ marginLeft: "auto" }}
                data-testid="task-list-item-complete-button"
                onClick={() => dispatch(taskEntities.actions.complete(taskId))}
            >
                <CheckCircleOutlineIcon />
            </IconButton>
        );
    }
};

export default TasksListItem;
