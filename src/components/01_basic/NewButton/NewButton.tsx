import { useEffect, useState, memo } from "react";
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

    // Reset title value when leave editing mode
    useEffect(() => {
        setTaskTitle("");
    }, [isEditing]);

    return isEditing ? (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                if (taskTitle.length > 100) return;

                onCreate(taskTitle);
                setIsEditing(false);
            }}
        >
            <Stack spacing={1}>
                <Input />
                <Stack direction="row" spacing={1}>
                    <SubmitButton />
                    <CancelButton />
                </Stack>
            </Stack>
        </form>
    ) : (
        <AddButton />
    );

    function Input() {
        return (
            <TextField
                value={taskTitle}
                type="text"
                name="title"
                size="small"
                autoFocus
                fullWidth
                onChange={(event) => setTaskTitle(event.target.value)}
            />
        );
    }

    function SubmitButton() {
        return (
            <Button
                type="submit"
                size="small"
                variant="contained"
                disabled={taskTitle.length === 0}
            >
                {addButtonText}
            </Button>
        );
    }

    function CancelButton() {
        return (
            <Button size="small" onClick={() => setIsEditing(false)}>
                Cancel
            </Button>
        );
    }

    function AddButton() {
        return (
            <Button startIcon={<AddRoundedIcon />} onClick={() => setIsEditing(true)}>
                {addButtonText}
            </Button>
        );
    }
};

export default memo(NewButton);
