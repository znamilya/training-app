import { FormEvent, memo, useState } from "react";
import { Button, Stack, TextField } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

export type NewButtonProps = {
    addButtonText: string;
    onCreate(title: string): void;
};

/**
 * A button for creating new entities
 */
const NewButton = ({ addButtonText = "Add", onCreate }: NewButtonProps) => {
    const [value, setValue] = useState("");
    const [isEditMode, setIsEditMode] = useState(false);

    // HANDLERS
    const handleAddButtonClick = () => {
        setIsEditMode(true);
    };

    const handleCancelButtonClick = () => {
        setIsEditMode(false);
        setValue("");
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsEditMode(false);
        setValue("");
        onCreate(value);
    };

    // RENDER
    return isEditMode ? (
        <form data-testid="add-form" onSubmit={handleSubmit}>
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
                value={value}
                size="small"
                name="title"
                type="text"
                inputProps={{
                    "aria-label": "title",
                }}
                autoFocus
                fullWidth
                onChange={(event) => setValue(event.target.value)}
            />
        );
    }

    function SubmitButton() {
        return (
            <Button type="submit" size="small" variant="contained" disabled={value.length === 0}>
                {addButtonText}
            </Button>
        );
    }

    function CancelButton() {
        return (
            <Button size="small" onClick={handleCancelButtonClick}>
                Cancel
            </Button>
        );
    }

    function AddButton() {
        return (
            <Button startIcon={<AddRoundedIcon />} onClick={handleAddButtonClick}>
                {addButtonText}
            </Button>
        );
    }
};

export default memo(NewButton);
