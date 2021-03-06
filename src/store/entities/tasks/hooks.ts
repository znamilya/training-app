import { useCallback } from "react";
import { TaskId } from "../../../enteties/task";

import { useAppDispatch, useAppSelector } from "../../store";
import { complete, create, CreateParams, remove, start, stop } from "./actions";

import { selectById } from "./selectors";

export const useTask = (taskId: TaskId = "") => {
    const dispatch = useAppDispatch();
    const envelope = useAppSelector(selectById(taskId));

    const createHandler = useCallback(
        (data: CreateParams) => dispatch(create(data)).unwrap(),
        [dispatch],
    );

    const removeHandler = useCallback(
        (taskId: TaskId) => dispatch(remove(taskId)).unwrap(),
        [dispatch],
    );

    const completeHandler = useCallback(
        (taskId: TaskId) => dispatch(complete({ taskId })).unwrap(),
        [dispatch],
    );

    const startHandler = useCallback(
        (taskId: TaskId) => dispatch(start({ taskId })).unwrap(),
        [dispatch],
    );

    const stopHandler = useCallback(
        (taskId: TaskId) => dispatch(stop({ taskId })).unwrap(),
        [dispatch],
    );

    return {
        data: envelope?.data || null,
        isRemoving: envelope?.status === "removing" || false,
        isStarting: envelope?.status === "starting" || false,
        isStoping: envelope?.status === "stoping" || false,
        create: createHandler,
        remove: removeHandler,
        complete: completeHandler,
        start: startHandler,
        stop: stopHandler,
    };
};
