import { Typography } from "@mui/material";
import { ReactNode } from "react";

type PageTitleProps = {
    children: ReactNode;
};

const PageTitle = ({ children }: PageTitleProps) => {
    return (
        <Typography variant="h3" component="h1" gutterBottom>
            {children}
        </Typography>
    );
};

export default PageTitle;
