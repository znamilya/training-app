import { Button } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

/**
 * A button for creating a new task in inbox
 */
const NewInboxTaskButton = () => {
    return (
        <Button startIcon={<AddRoundedIcon />} onClick={() => {}}>
            Add a task
        </Button>
    );
};

export default NewInboxTaskButton;
