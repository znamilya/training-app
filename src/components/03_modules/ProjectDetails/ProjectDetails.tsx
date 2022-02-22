import { useLayoutEffect } from "react";
import { useHistory } from "react-router";
import { Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import EditIcon from "@mui/icons-material/Edit";

import routes from "../../../routes";
import { ProjectId } from "../../../enteties/project/types";
import * as projectEnteties from "../../../store/entities/projects";
import { useAppDispatch } from "../../../store/store";
import { useProject } from "../../../store/entities/projects";
import PageTitle from "../../01_basic/PageTitle";
import TasksList, { TasksListItem } from "../../01_basic/TasksList";
import { TaskId } from "../../../enteties/task";
import { useTask } from "../../../store/entities/tasks";

import StartButton from "./components/StartButton";

type ProjectDetailsModuleProps = {
    projectId: ProjectId;
};

/**
 * Displays info about project (its title, tasks, etc) with ability to edit it.
 */
const ProjectDetailsModule = ({ projectId }: ProjectDetailsModuleProps) => {
    const {
        data: project,
        error,
        isCompleted,
        isLoading,
        isRenaming,
        isRemoving,
        isStarting,
        isStoping,
        isCompliting,
        fetch,
        rename,
        start,
        stop,
        complete,
    } = useProject(projectId);
    const task = useTask();
    const history = useHistory();
    const dispatch = useAppDispatch();

    useLayoutEffect(() => {
        fetch(projectId);
    }, [fetch, projectId]);

    const handleStartButtonClick = () => {
        start(projectId);
    };

    const handleStopButtonClick = () => {
        stop(projectId);
    };

    const handleRenameButtonClick = () => {
        const newTitle = prompt("New title");

        if (!newTitle) return;

        rename(projectId, newTitle);
    };

    const handleRemoveButtonClick = async () => {
        await dispatch(
            projectEnteties.actions.remove({
                projectId,
            }),
        );

        const route = isCompleted ? routes.completedProjects({}).$ : routes.projects({}).$;

        history.push(route);
    };

    const handleCompleteButtonClick = () => {
        complete(projectId);
    };

    const handleAddTask = async (title: string, onSuccess: () => void, onError: () => void) => {
        task.create({ projectId, title })
            .then(() => {
                onSuccess();
            })
            .catch(() => onError);
    };

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    if (error) {
        return <h1>{error}</h1>;
    }

    if (!project) {
        // TODO: Handle absent project
        return <PageTitle>Unknown project</PageTitle>;
    }

    const shouldDisableButtons =
        isRenaming || isRemoving || isStarting || isStoping || isCompliting;

    return (
        <>
            <Stack direction="row" spacing={2} mb={2}>
                {isCompleted ? null : project.isActive ? (
                    // STOP BUTTON
                    <LoadingButton
                        startIcon={<PauseIcon />}
                        disabled={shouldDisableButtons}
                        loading={isStoping}
                        onClick={handleStopButtonClick}
                    >
                        Stop
                    </LoadingButton>
                ) : (
                    <StartButton
                        disabled={shouldDisableButtons}
                        loading={isStarting}
                        onClick={handleStartButtonClick}
                    />
                )}

                {/* RENAME BUTTON */}
                <LoadingButton
                    startIcon={<EditIcon />}
                    disabled={shouldDisableButtons}
                    loading={isRenaming}
                    onClick={handleRenameButtonClick}
                >
                    Rename
                </LoadingButton>

                {/* REMOVE BUTTON */}
                <LoadingButton
                    disabled={shouldDisableButtons}
                    loading={isRemoving}
                    onClick={handleRemoveButtonClick}
                >
                    Remove
                </LoadingButton>

                {/* COMPLETE BUTTON */}
                {!isCompleted && (
                    <LoadingButton
                        disabled={shouldDisableButtons}
                        loading={isCompliting}
                        onClick={handleCompleteButtonClick}
                    >
                        Complete
                    </LoadingButton>
                )}
            </Stack>

            <TasksList onTaskAdd={!isCompleted ? handleAddTask : undefined}>
                {project.tasks.map((taskId) => (
                    <TaskListItemConnected taskId={taskId} key={taskId} />
                ))}
            </TasksList>
        </>
    );
};

const TaskListItemConnected = ({ taskId }: { taskId: TaskId }) => {
    const {
        data: task,
        isRemoving,
        isStarting,
        isStoping,
        remove,
        complete,
        start,
        stop,
    } = useTask(taskId);

    if (!task) return null;

    return (
        <TasksListItem
            id={taskId}
            title={task.title}
            isComplete={task.isComplete}
            isNextAction={task.isNextAction}
            isRemoving={isRemoving}
            isStarting={isStarting}
            isStoping={isStoping}
            onComplete={complete}
            onStart={start}
            onStop={stop}
            onRemove={remove}
            key={taskId}
        />
    );
};

export default ProjectDetailsModule;
