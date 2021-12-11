import { memo } from "react";

import { TaskId } from "../../../enteties/task";
import useProjects from "../../../hooks/controllers/useProjects";
import routes from "../../../routes";
import EditTaskTitleButton from "../EditTaskTitleButton";
import ToggleTaskCompleteCheckbox from "../ToggleTaskCompleteCheckbox";
import StartTaskButton from "../StartTaskButton";
import StopTaskButton from "../StopTaskButton";
import RemoveTaskButton from "../RemoveTaskButton";
import ProjectTitle from "../ProjectTitle";

import {
    RootStyled,
    CheckboxStyled,
    TitleWrapperStyled,
    TitleStyled,
    ActionsStyled,
    ProjectStyled,
} from "./NextActionItem.styled";

type NextActionItemProps = {
    taskId: TaskId;
};

const NextActionItem = ({ taskId }: NextActionItemProps) => {
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

                {/* PROJECT NAME */}
                {task.projectId ? (
                    <ProjectStyled to={routes.project({ projectId: task.projectId })}>
                        <ProjectTitle projectId={task.projectId} />
                    </ProjectStyled>
                ) : null}
            </TitleWrapperStyled>

            <ActionsStyled>
                {task.isComplete || !task.projectId ? null : task.isNextAction ? (
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

export default memo(NextActionItem);
