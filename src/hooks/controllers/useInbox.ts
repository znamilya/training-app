import * as allInboxTasksCollection from "../../store/collections/allInboxTasks";
import { useAppDispatch, useAppSelector } from "../../store/store";

const useInbox = () => {
    const selector = useAppSelector;
    const dispatch = useAppDispatch();

    const createTask = (title: string) => {
        console.log("Add inbox task: ", title);
    };

    const selectAllTasksIds = () => {
        return selector(allInboxTasksCollection.selectors.seletIds);
    };

    const selectTasksTotalCount = () => {
        return selector(allInboxTasksCollection.selectors.selectTotalCount);
    };

    return {
        createTask,
        selectAllTasksIds,
        selectTasksTotalCount,
    };
};

export default useInbox;
