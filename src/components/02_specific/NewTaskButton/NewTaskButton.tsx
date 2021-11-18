import { Button } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

import useTasksController from "../../../hooks/controllers/useTasksController/useTasksController";
import { ProjectId } from "../../../entities/project/types";

type NewTaskButtonProps = {
    projectId: ProjectId;
};

/**
 * A button for creating new tasks
 */
const NewTaskButton = ({ projectId }: NewTaskButtonProps) => {
    const { addTask } = useTasksController(projectId);

    return (
        <Button startIcon={<AddRoundedIcon />} onClick={() => addTask()}>
            Add a task
        </Button>
    );
};

export default NewTaskButton;
