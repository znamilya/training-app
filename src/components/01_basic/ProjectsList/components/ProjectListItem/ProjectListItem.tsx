import { ProjectId } from "../../../../../entities/project/types";
import { Link } from "typesafe-routes/react-router";

import routes from "../../../../../routes";

import { RootStyled, LinkStyled } from "./ProjectListItem.styled";

type ProjectListItemProps = {
    id: ProjectId;
    title: string;
};

const ProjectListItem = ({ id, title }: ProjectListItemProps) => {
    return (
        <RootStyled>
            <LinkStyled component={Link} to={routes.project({ projectId: id })} elevation={1}>
                {title}
            </LinkStyled>
        </RootStyled>
    );
};

export default ProjectListItem;
