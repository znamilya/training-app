import { useMemo } from "react";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

import { ProjectId } from "../../../entities/project/types";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import * as projectEnteties from "../../../store/enteties/projects";
import * as tasksByProjectsCollection from "../../../store/collections/tasksByProjects";
import PageTitle from "../../01_basic/PageTitle";
import TasksList, { TasksListItem } from "../../02_specific/TasksList";
import NewProjectTaskButton from "../../02_specific/NewProjectTaskButton";
import { Fab, Stack } from "@mui/material";

type ProjectDetailsModuleProps = {
    projectId: ProjectId;
};

/**
 * Displays info about project (its title, tasks, etc) with ability to edit it.
 */
const ProjectDetailsModule = ({ projectId }: ProjectDetailsModuleProps) => {
    const projectSelector = useMemo(
        () => projectEnteties.selectors.selectById(projectId),
        [projectId],
    );
    const project = useAppSelector(projectSelector);
    const tasksSelector = useMemo(
        () => tasksByProjectsCollection.selectors.seletIds(projectId),
        [project],
    );
    const tasksIds = useAppSelector(tasksSelector);
    const dispatch = useAppDispatch();

    if (!project) {
        // TODO: Handle absent project
        return <PageTitle>Unknown project</PageTitle>;
    }

    return (
        <div>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="self-start"
                spacing={2}
            >
                <PageTitle>{project.title}</PageTitle>
                {project.isActive ? (
                    <Fab
                        size="small"
                        onClick={() => dispatch(projectEnteties.actions.stop(projectId))}
                    >
                        <PauseIcon />
                    </Fab>
                ) : (
                    <Fab
                        size="small"
                        onClick={() => dispatch(projectEnteties.actions.start(projectId))}
                    >
                        <PlayArrowIcon />
                    </Fab>
                )}
            </Stack>
            <TasksList addButton={<NewProjectTaskButton projectId={project.id} />}>
                {tasksIds.map((taskId) => (
                    <TasksListItem taskId={taskId} key={taskId} />
                ))}
            </TasksList>
        </div>
    );
};

export default ProjectDetailsModule;
