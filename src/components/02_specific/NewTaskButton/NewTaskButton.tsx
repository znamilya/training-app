import { Button } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

import { ProjectId } from "../../../entities/project/types";

type NewTaskButtonProps = {
    projectId: ProjectId;
};

/**
 * A button for creating new tasks
 */
const NewTaskButton = ({ projectId }: NewTaskButtonProps) => {
    return (
        <Button startIcon={<AddRoundedIcon />} onClick={() => {}}>
            Add a task
        </Button>
    );
};

export default NewTaskButton;
