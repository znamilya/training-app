import { Children, ReactNode } from "react";

import { RootStyled } from "./ProjectsList.styled";

type ProjectsListProps = {
    children: ReactNode;
};

const ProjectsList = ({ children }: ProjectsListProps) => {
    const hasNoItems = Children.count(children) === 0;

    return <RootStyled spacing={1}>{hasNoItems ? "No projects yet..." : children}</RootStyled>;
};

export default ProjectsList;
