import { useEffect, useState } from "react";
import { Button, Stack, TextField } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

type NewButtonProps = {
    addButtonText?: string;
    onCreate(title: string): void;
};

/**
 * A button for creating new enteties
 */
const NewButton = ({ addButtonText = "Add", onCreate }: NewButtonProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [taskTitle, setTaskTitle] = useState("");

    // Reset title value when editing leave editing
    useEffect(() => {
        setTaskTitle("");
    }, [isEditing]);

    return isEditing ? (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                onCreate(taskTitle);
                setIsEditing(false);
            }}
        >
            <Stack spacing={1}>
                <TextField
                    value={taskTitle}
                    type="text"
                    name="title"
                    size="small"
                    autoFocus
                    fullWidth
                    onChange={(event) => setTaskTitle(event.target.value)}
                />
                <Stack direction="row" spacing={1}>
                    <Button
                        type="submit"
                        size="small"
                        variant="contained"
                        disabled={taskTitle.length === 0}
                    >
                        {addButtonText}
                    </Button>
                    <Button size="small" onClick={() => setIsEditing(false)}>
                        Cancel
                    </Button>
                </Stack>
            </Stack>
        </form>
    ) : (
        <Button startIcon={<AddRoundedIcon />} onClick={() => setIsEditing(true)}>
            {addButtonText}
        </Button>
    );
};

export default NewButton;
