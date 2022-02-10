import { memo } from "react";

import { TaskId } from "../../../enteties/task";
import routes from "../../../routes";
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
    return null;
    // const { selectTaskById } = useProjects();
    // const taskEnvelope = selectTaskById(taskId);

    // if (!taskEnvelope?.data) return null;

    // const task = taskEnvelope.data;

    // return (
    //     <RootStyled component="li" elevation={1}>
    //         <CheckboxStyled>
    //             <ToggleTaskCompleteCheckbox taskId={task.id} />
    //         </CheckboxStyled>

    //         <TitleWrapperStyled>
    //             <TitleStyled>{task.isComplete ? <del>{task.title}</del> : task.title}</TitleStyled>

    //             {/* PROJECT NAME */}
    //             {task.projectId ? (
    //                 <ProjectStyled to={routes.project({ projectId: task.projectId })}>
    //                     <ProjectTitle projectId={task.projectId} />
    //                 </ProjectStyled>
    //             ) : null}
    //         </TitleWrapperStyled>

    //         <ActionsStyled>
    //             {task.isComplete || !task.projectId ? null : task.isNextAction ? (
    //                 <StopTaskButton taskId={task.id} />
    //             ) : (
    //                 <StartTaskButton taskId={task.id} />
    //             )}
    //             <EditTaskTitleButton taskId={task.id} />
    //             <RemoveTaskButton taskId={task.id} />
    //         </ActionsStyled>
    //     </RootStyled>
    // );
};

export default memo(NextActionItem);
