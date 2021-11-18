import { createContext } from "react";

import { AnyId } from "../../../types";

const TaskListContext = createContext<{
    onComplete(taskId: AnyId): void;
}>({
    onComplete() {
        console.log("jopa");
    },
});

export default TaskListContext;
