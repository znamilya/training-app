import { memo } from "react";

import { TaskId } from "../../../../../enteties/task";
import useProjects from "../../../../../hooks/controllers/useProjects";
import ToggleTaskCompleteCheckbox from "../../../../02_specific/ToggleTaskCompleteCheckbox";
import EditTaskTitleButton from "../../../../02_specific/EditTaskTitleButton";
import StartTaskButton from "../../../../02_specific/StartTaskButton";
import StopTaskButton from "../../../../02_specific/StopTaskButton";
import RemoveTaskButton from "../../../../02_specific/RemoveTaskButton";

import {
    RootStyled,
    CheckboxStyled,
    TitleWrapperStyled,
    TitleStyled,
    ActionsStyled,
} from "./TasksListItem.styled";

type TasksListItemProps = {
    taskId: TaskId;
};

const TasksListItem = ({ taskId }: TasksListItemProps) => {
    const { selectTaskById } = useProjects();
    const task = selectTaskById(taskId);

    if (!task) return null;

    return (
        <RootStyled component="li" elevation={1}>
            <CheckboxStyled>
                <ToggleTaskCompleteCheckbox taskId={task.id} />
            </CheckboxStyled>

            <TitleWrapperStyled>
                <TitleStyled>{task.isComplete ? <del>{task.title}</del> : task.title}</TitleStyled>
            </TitleWrapperStyled>

            <ActionsStyled>
                {task.isComplete ? null : task.isNextAction ? (
                    <StopTaskButton taskId={task.id} />
                ) : (
                    <StartTaskButton taskId={task.id} />
                )}
                <EditTaskTitleButton taskId={task.id} />
                <RemoveTaskButton taskId={task.id} />
            </ActionsStyled>
        </RootStyled>
    );
};

export default memo(TasksListItem);
