import { memo } from "react";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { TaskId } from "../../../enteties/task";
import useProjects from "../../../hooks/controllers/useProjects";

type RemoveTaskButtonProps = {
    taskId: TaskId;
};
const RemoveTaskButton = ({ taskId }: RemoveTaskButtonProps) => {
    const { removeTask, selectTaskById } = useProjects();
    const task = selectTaskById(taskId);

    if (!task) return null;

    return (
        <IconButton sx={{ marginLeft: "auto" }} onClick={() => removeTask(taskId, task?.projectId)}>
            <DeleteIcon />
        </IconButton>
    );
};

export default memo(RemoveTaskButton);
