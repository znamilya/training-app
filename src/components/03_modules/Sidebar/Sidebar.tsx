// import { Toolbar } from "@mui/material";
import { ProjectId } from "../../../entities/project/types";
import InboxIcon from "@mui/icons-material/Inbox";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";

import routes from "../../../routes";
import * as projectEnteties from "../../../store/enteties/projects";
import * as allProjectsCollection from "../../../store/collections/allProjects";
import * as allTodayTasksCollection from "../../../store/collections/allTodayTasks";
import { useAppSelector } from "../../../store/store";
import MenuSection, { MenuSectionItem } from "../../01_basic/MenuSection";

import { RootStyled } from "./Sidebar.styled";

type ProjectMenuSectionItemProps = {
    projectId: ProjectId;
};

const ProjectMenuSectionItem = ({ projectId }: ProjectMenuSectionItemProps) => {
    const project = useAppSelector(projectEnteties.selectors.selectById(projectId));
    const uncompletedTasksCount = useAppSelector(
        projectEnteties.selectors.selectUncompletedTasksCount(projectId),
    );

    if (!project) return null;

    return (
        <MenuSectionItem
            icon={<FormatListBulletedIcon />}
            title={project.title}
            href={routes.project({ projectId: project.id })}
            tasksCount={uncompletedTasksCount}
        />
    );
};

const SidebarModule = () => {
    const allActiveProjects = useAppSelector(allProjectsCollection.selectors.selectAllActive);
    const allProjectsTotalCount = useAppSelector(allProjectsCollection.selectors.selectTotalCount);
    const allTodayTasksTotalCount = useAppSelector(
        allTodayTasksCollection.selectors.selectTotalCount,
    );

    return (
        <RootStyled variant="permanent">
            {/* <Toolbar /> */}
            <MenuSection>
                <MenuSectionItem
                    icon={<InboxIcon />}
                    titleTransId="SidebarModule.Inbox"
                    href={routes.inbox({})}
                    tasksCount={0}
                />
                <MenuSectionItem
                    icon={<DoubleArrowIcon />}
                    titleTransId="SidebarModule.NextTasks"
                    href={routes.today({})}
                    tasksCount={allTodayTasksTotalCount}
                />
                <MenuSectionItem
                    icon={<ListAltIcon />}
                    titleTransId="SidebarModule.AllProjects"
                    href={routes.projects({})}
                    tasksCount={allProjectsTotalCount}
                />
            </MenuSection>
            <MenuSection titleTransId="SidebarModule.ActiveProjects">
                {allActiveProjects.map((project) => (
                    <ProjectMenuSectionItem projectId={project.id} />
                ))}
            </MenuSection>
        </RootStyled>
    );
};

export default SidebarModule;
