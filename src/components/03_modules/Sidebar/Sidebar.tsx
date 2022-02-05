// import { Toolbar } from "@mui/material";
import { ProjectId } from "../../../enteties/project/types";
// import InboxIcon from "@mui/icons-material/Inbox";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";

import routes from "../../../routes";
// import * as projectEnteties from "../../../store/enteties/projects";
import MenuSection, { MenuSectionItem } from "../../01_basic/MenuSection";

import { RootStyled } from "./Sidebar.styled";
// import useInbox from "../../../hooks/controllers/useInbox";
import useProjects from "../../../hooks/controllers/useProjects";
import { useAppSelector } from "../../../store/store";
import * as allProjectsCollection from "../../../store/collections/allProjects";
import { unwrapEntityEnvelope } from "../../../store/utils";

type ProjectMenuSectionItemProps = {
    projectId: ProjectId;
};

const ProjectMenuSectionItem = ({ projectId }: ProjectMenuSectionItemProps) => {
    const { selectProjectById, selectUncompletedTasksCount } = useProjects();
    const projectEnvelope = selectProjectById(projectId);

    if (!projectEnvelope) return null;

    const project = unwrapEntityEnvelope(projectEnvelope);

    return (
        <MenuSectionItem
            icon={<FormatListBulletedIcon />}
            title={project.title}
            href={routes.project({ projectId: project.id })}
            tasksCount={selectUncompletedTasksCount(projectId)}
        />
    );
};

const SidebarModule = () => {
    const allProjectsTotalCount = useAppSelector(allProjectsCollection.selectors.selectTotalCount);
    const allActiveProjectsIds = useAppSelector(allProjectsCollection.selectors.selectAllActiveIds);

    return (
        <RootStyled variant="permanent">
            {/* <Toolbar /> */}
            <MenuSection>
                {/* <MenuSectionItem
                    icon={<InboxIcon />}
                    titleTransId="SidebarModule.Inbox"
                    href={routes.inbox({})}
                    tasksCount={selectTasksTotalCount()}
                /> */}
                {/* <MenuSectionItem
                    icon={<DoubleArrowIcon />}
                    titleTransId="SidebarModule.NextTasks"
                    href={routes.today({})}
                    tasksCount={xxx.length}
                /> */}
                <MenuSectionItem
                    icon={<ListAltIcon />}
                    titleTransId="SidebarModule.AllProjects"
                    href={routes.projects({})}
                    tasksCount={allProjectsTotalCount}
                />
                {/* <MenuSectionItem
                    icon={<ListAltIcon />}
                    titleTransId="SidebarModule.Categories"
                    href={routes.categories({})}
                    disableCounter
                /> */}
            </MenuSection>
            <MenuSection titleTransId="SidebarModule.ActiveProjects">
                {allActiveProjectsIds.map((projectId) => (
                    <ProjectMenuSectionItem projectId={projectId} />
                ))}
            </MenuSection>
        </RootStyled>
    );
};

export default SidebarModule;
