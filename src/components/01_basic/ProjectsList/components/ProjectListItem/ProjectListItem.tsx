import { useMemo } from "react";

import * as projectEnteties from "../../../../../store/enteties/projects";
import { useAppSelector } from "../../../../../store/store";
import { ProjectId } from "../../../../../entities/project/types";
import { Link } from "typesafe-routes/react-router";
import routes from "../../../../../routes";

import { RootStyled } from "./ProjectListItem.styled";

type ProjectListItemProps = {
    projectId: ProjectId;
};

const ProjectListItem = ({ projectId }: ProjectListItemProps) => {
    const projectSelector = useMemo(
        () => projectEnteties.selectors.selectById(projectId),
        [projectId],
    );
    const project = useAppSelector(projectSelector);

    if (!project) return null;

    return (
        <RootStyled component={Link} to={routes.project({ projectId })} elevation={1}>
            {project.title}
        </RootStyled>
    );
};

export default ProjectListItem;
