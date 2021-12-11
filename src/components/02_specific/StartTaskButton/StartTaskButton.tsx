import { memo } from "react";
import { IconButton } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

import { TaskId } from "../../../enteties/task";
// import useProjects from "../../../hooks/controllers/useProjects";

type StartTaskButtonProps = {
    taskId: TaskId;
};
const StartTaskButton = ({ taskId }: StartTaskButtonProps) => {
    // const { startTask } = useProjects();

    return (
        <IconButton sx={{ marginLeft: "auto" }} onClick={() => {}}>
            <PlayArrowIcon />
        </IconButton>
    );
};

export default memo(StartTaskButton);
