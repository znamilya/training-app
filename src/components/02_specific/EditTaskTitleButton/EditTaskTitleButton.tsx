import { memo } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";

import { TaskId } from "../../../enteties/task";
import useProjects from "../../../hooks/controllers/useProjects";

type EditTaskTitleButtonProps = {
    taskId: TaskId;
};

const EditTaskTitleButton = ({ taskId }: EditTaskTitleButtonProps) => {
    const { renameTask } = useProjects();

    const handleRename = () => {
        const title = prompt("New title");

        if (title) {
            renameTask(taskId, title);
        }
    };

    return (
        <IconButton sx={{ marginLeft: "auto" }} onClick={handleRename}>
            <EditIcon />
        </IconButton>
    );
};

export default memo(EditTaskTitleButton);
