import { FormEvent, memo, useState } from "react";
import { Button, Stack, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

export type NewButtonProps = {
    addButtonText: string;
    onCreate(title: string, onSuccess: () => void, onError: () => void): void;
};

/**
 * A button for creating new entities
 */
const NewButton = ({ addButtonText = "Add", onCreate }: NewButtonProps) => {
    const [value, setValue] = useState("");
    const [isEditMode, setIsEditMode] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isFailed, setIsFailed] = useState(false);

    // HANDLERS
    const handleAddButtonClick = () => {
        setIsEditMode(true);
    };

    const handleCancelButtonClick = () => {
        setIsEditMode(false);
        setIsFailed(false);
        setValue("");
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSaving(true);
        setIsFailed(false);
        onCreate(
            value,
            () => {
                setIsEditMode(false);
                setValue("");
                setIsSaving(false);
            },
            () => {
                setIsSaving(false);
                setIsFailed(true);
            },
        );
    };

    // RENDER
    return isEditMode ? (
        <form data-testid="add-form" onSubmit={handleSubmit}>
            <Stack spacing={1}>
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
                {isFailed && <div>Can't create a project</div>}
                <Stack direction="row" spacing={1}>
                    <LoadingButton
                        type="submit"
                        size="small"
                        loading={isSaving}
                        variant="contained"
                        disabled={value.length === 0}
                    >
                        {addButtonText}
                    </LoadingButton>

                    <Button size="small" disabled={isSaving} onClick={handleCancelButtonClick}>
                        Cancel
                    </Button>
                </Stack>
            </Stack>
        </form>
    ) : (
        <Button startIcon={<AddRoundedIcon />} onClick={handleAddButtonClick}>
            {addButtonText}
        </Button>
    );
};

export default memo(NewButton);
