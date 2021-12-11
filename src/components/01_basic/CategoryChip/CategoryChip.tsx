import { Chip } from "@mui/material";

type CategoryChipProps = {
    label: string;
};

const CategoryChip = ({ label }: CategoryChipProps) => {
    return <Chip label={label} size="small" variant="outlined" />;
};

export default CategoryChip;
