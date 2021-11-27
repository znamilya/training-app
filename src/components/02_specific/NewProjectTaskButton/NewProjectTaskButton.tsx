import { Button } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

import { ProjectId } from "../../../entities/project/types";

type NewProjectTaskButtonProps = {
    projectId: ProjectId;
};

/**
 * A button for creating new tasks in a project
 */
const NewProjectTaskButton = ({ projectId }: NewProjectTaskButtonProps) => {
    return (
        <Button startIcon={<AddRoundedIcon />} onClick={() => {}}>
            Add a task
        </Button>
    );
};

export default NewProjectTaskButton;
