import { memo } from "react";
import { IconButton } from "@mui/material";
import PauseIcon from "@mui/icons-material/Pause";

import { TaskId } from "../../../enteties/task";
// import useProjects from "../../../hooks/controllers/useProjects";

type StopTaskButtonProps = {
    taskId: TaskId;
};
const StopTaskButton = ({ taskId }: StopTaskButtonProps) => {
    // const { stopTask } = useProjects();

    return (
        <IconButton sx={{ marginLeft: "auto" }} onClick={() => {}}>
            <PauseIcon />
        </IconButton>
    );
};

export default memo(StopTaskButton);
