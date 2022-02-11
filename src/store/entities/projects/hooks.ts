import { useCallback } from "react";

import { ProjectId } from "../../../enteties/project/types";
import { useAppDispatch, useAppSelector } from "../../store";

import { fetch, create, rename, start, stop, complete } from "./actions";
import { selectById, selectUncompletedTasksCount } from "./selectors";

export const useProject = (projectId: ProjectId = "") => {
    const dispatch = useAppDispatch();
    const selector = useAppSelector;
    const envelope = useAppSelector(selectById(projectId));

    const fetchHandler = useCallback(
        async (projectId: ProjectId) => dispatch(fetch({ projectId })).unwrap(),
        [dispatch],
    );

    const createHandler = useCallback(
        async ({ title }: { title: string }) => dispatch(create({ title })).unwrap(),
        [dispatch],
    );

    const renameHandler = useCallback(
        async (projectId: ProjectId, newTitle: string) =>
            dispatch(rename({ projectId, newTitle })).unwrap(),
        [dispatch],
    );

    const startHandler = useCallback(
        async (projectId: ProjectId) => dispatch(start({ projectId })).unwrap(),
        [dispatch],
    );

    const stopHandler = useCallback(
        async (projectId: ProjectId) => dispatch(stop({ projectId })).unwrap(),
        [dispatch],
    );

    const completeHandler = useCallback(
        async (projectId: ProjectId) => dispatch(complete({ projectId })).unwrap(),
        [dispatch],
    );

    return {
        data: envelope?.data || null,
        error: envelope?.error || null,
        isStale: envelope?.isStale || false,
        isCompleted: envelope?.data?.isCompleted || false,
        isLoading: envelope?.status === "loading",
        isRenaming: envelope?.status === "renaming",
        isRemoving: envelope?.status === "removing",
        isStarting: envelope?.status === "starting",
        isStoping: envelope?.status === "stoping",
        isCompliting: envelope?.status === "compliting",
        fetch: fetchHandler,
        create: createHandler,
        rename: renameHandler,
        start: startHandler,
        stop: stopHandler,
        complete: completeHandler,
        selectUncompletedTasksCount: () => selector(selectUncompletedTasksCount(projectId)),
    };
};
