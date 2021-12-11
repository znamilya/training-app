import { render } from "@testing-library/react";
import { byRole, byText } from "testing-library-selector";
import faker from "faker";

import TasksListItem from "./components/TasksListItem";
import { buildTask } from "../../../enteties/task/factory";

import TasksList, { TasksListProps } from "./TasksList";

const renderComponent = (props: Partial<TasksListProps>) => {
    const defaultProps: TasksListProps = {
        children: [],
        onTaskAdd: () => {},
    };

    const utils = render(<TasksList {...defaultProps} {...props} />);

    return {
        ...utils,
        list: byRole("list"),
        items: byRole("listitem"),
        emptyMessage: byText("No tasks yet..."),
        addTaskButton: byRole("button", { name: "Add Task" }),
    };
};

describe("Render", () => {
    describe("When there are a few projects", () => {
        it("renders respective elements", () => {
            const TASKS1 = faker.datatype.string(3);
            const TASKS2 = faker.datatype.string(3);
            const { list, items, emptyMessage, addTaskButton } = renderComponent({
                children: [
                    <TasksListItem
                        {...buildTask({ title: TASKS1 })}
                        onComplete={() => {}}
                        onStart={() => {}}
                        onStop={() => {}}
                        onEdit={() => {}}
                        onRemove={() => {}}
                        key="1"
                    />,
                    <TasksListItem
                        {...buildTask({ title: TASKS2 })}
                        onComplete={() => {}}
                        onStart={() => {}}
                        onStop={() => {}}
                        onEdit={() => {}}
                        onRemove={() => {}}
                        key="2"
                    />,
                ],
            });

            expect(list.get()).toBeInTheDocument();
            expect(items.getAll()).toHaveLength(2);
            expect(items.getAll()[0]).toHaveTextContent(TASKS1);
            expect(items.getAll()[1]).toHaveTextContent(TASKS2);
            expect(emptyMessage.query()).not.toBeInTheDocument();
            expect(addTaskButton.get()).toBeInTheDocument();
        });
    });

    describe("When there are no projects", () => {
        it("renders respective elements", () => {
            const { list, items, emptyMessage, addTaskButton } = renderComponent({
                children: [],
            });

            expect(list.query()).not.toBeInTheDocument();
            expect(items.queryAll()).toHaveLength(0);
            expect(emptyMessage.get()).toBeInTheDocument();
            expect(addTaskButton.get()).toBeInTheDocument();
        });
    });
});
