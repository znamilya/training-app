import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../store";

import { load } from "./actions";
import { getSlice, selectCompletedCount } from "./selectors";

export const useAllActiveTasks = () => {
    const dispatch = useAppDispatch();
    const select = useAppSelector;
    const { ids, status, error, isStale, totalCount } = useAppSelector(getSlice);

    const loadHandler = useCallback(async () => dispatch(load()), [dispatch]);

    const selectCompletedCountHandler = useCallback(() => select(selectCompletedCount), [select]);

    return {
        data: ids,
        totalCount,
        isStale,
        isLoading: status === "loading",
        error,
        load: loadHandler,
        selectCompletedCount: selectCompletedCountHandler,
    };
};
