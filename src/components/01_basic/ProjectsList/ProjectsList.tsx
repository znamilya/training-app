import { Children, ReactNode } from "react";

import NewButton from "../NewButton";

import { ListStyled, ActionsStyled } from "./ProjectsList.styled";

export type ProjectsListProps = {
    children: ReactNode;
    onProjectAdd(projectTitle: string): void;
};

/**
 * Display a list of project with ability to add a new one.
 */
const ProjectsList = ({ children, onProjectAdd }: ProjectsListProps) => {
    const hasItems = Children.count(children) > 0;

    return (
        <>
            {hasItems ? (
                <ListStyled spacing={1} component={"ul"}>
                    {children}
                </ListStyled>
            ) : (
                <div>No projects yet...</div>
            )}
            <ActionsStyled>
                <NewButton addButtonText="Add Project" onCreate={onProjectAdd} />
            </ActionsStyled>
        </>
    );
};

export default ProjectsList;
