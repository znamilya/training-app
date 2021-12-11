import { Button, Stack } from "@mui/material";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import EditIcon from "@mui/icons-material/Edit";

import { ProjectId } from "../../../entities/project/types";
import useProjects from "../../../hooks/controllers/useProjects";
import PageTitle from "../../01_basic/PageTitle";
import TasksList, { TasksListItem } from "../../01_basic/TasksList";
import { useHistory } from "react-router";
import routes from "../../../routes";
import { useCallback } from "react";

type ProjectDetailsModuleProps = {
    projectId: ProjectId;
};

/**
 * Displays info about project (its title, tasks, etc) with ability to edit it.
 */
const ProjectDetailsModule = ({ projectId }: ProjectDetailsModuleProps) => {
    const history = useHistory();
    const {
        renameProject,
        stopProject,
        startProject,
        removeProject,
        createTask,
        selectProjectById,
        selectProjectTasksIds,
    } = useProjects();
    const project = selectProjectById(projectId);
    const tasksIds = selectProjectTasksIds(projectId);

    const handleTaskAdd = useCallback((title: string) => {
        createTask({ projectId, title });
    }, []);

    if (!project) {
        // TODO: Handle absent project
        return <PageTitle>Unknown project</PageTitle>;
    }

    return (
        <>
            <Stack direction="row" spacing={2} mb={2}>
                {project.isActive ? <StopButton /> : <StartButton />}
                <RenameButton />
                <RemoveButton />
            </Stack>

            <ProjectTasksList />
        </>
    );

    function handleProjectRemove() {
        removeProject(projectId);
        history.push(routes.projects({}).$);
    }

    function RenameButton() {
        const handleRename = () => {
            const newTitle = prompt("New title");

            if (newTitle) {
                renameProject(projectId, newTitle);
            }
        };

        return (
            <Button startIcon={<EditIcon />} onClick={handleRename}>
                Rename
            </Button>
        );
    }

    function StopButton() {
        return (
            <Button startIcon={<PauseIcon />} onClick={() => stopProject(projectId)}>
                Stop
            </Button>
        );
    }

    function StartButton() {
        return (
            <Button startIcon={<PlayArrowIcon />} onClick={() => startProject(projectId)}>
                Start
            </Button>
        );
    }

    function RemoveButton() {
        return <Button onClick={handleProjectRemove}>Remove</Button>;
    }

    function ProjectTasksList() {
        return (
            <TasksList onTaskAdd={handleTaskAdd}>
                {tasksIds.map((taskId) => (
                    <TasksListItem taskId={taskId} key={taskId} />
                ))}
            </TasksList>
        );
    }
};

export default ProjectDetailsModule;
