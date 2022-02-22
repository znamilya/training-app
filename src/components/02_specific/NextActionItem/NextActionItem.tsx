import { memo } from "react";

import { TaskId } from "../../../enteties/task";
import routes from "../../../routes";
import { useTask } from "../../../store/entities/tasks";
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
    const { data: task } = useTask(taskId);

    if (!task) return null;

    return null;
};

export default memo(NextActionItem);
