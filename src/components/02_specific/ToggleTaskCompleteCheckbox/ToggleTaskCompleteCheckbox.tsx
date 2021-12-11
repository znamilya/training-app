import { memo } from "react";
// import { IconButton } from "@mui/material";
// import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { TaskId } from "../../../enteties/task";
// import useProjects from "../../../hooks/controllers/useProjects";

type ToggleTaskCompleteCheckboxProps = {
    taskId: TaskId;
};

const ToggleTaskCompleteCheckbox = ({ taskId }: ToggleTaskCompleteCheckboxProps) => {
    // const { markTaskAsCompleted, markTaskAsNotCompleted, selectTaskById } = useProjects();
    // const task = selectTaskById(taskId);

    return null;

    // return task.isComplete ? <UncompleteButton /> : <CompleteButton />;

    // --------------------------------------------------------------------------------- //

    // function UncompleteButton() {
    //     return (
    //         <IconButton sx={{ marginLeft: "auto" }} onClick={() => {}}>
    //             <CheckCircleIcon />
    //         </IconButton>
    //     );
    // }

    // function CompleteButton() {
    //     return (
    //         <IconButton
    //             sx={{ marginLeft: "auto" }}
    //             data-testid="task-list-item-complete-button"
    //             onClick={() => {}}
    //         >
    //             <CheckCircleOutlineIcon />
    //         </IconButton>
    //     );
    // }
};

export default memo(ToggleTaskCompleteCheckbox);
