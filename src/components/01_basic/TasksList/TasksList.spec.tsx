import { fireEvent, render, screen, within } from "@testing-library/react";

import TasksList, { TasksListProps } from "./TasksList";
import TasksListItem from "./components/TasksListItem";

const renderComponent = ({ children, ...props }: Partial<TasksListProps>) => {
    const defaultProps = {
        onComplete() {},
    };

    const result = render(
        <TasksList {...defaultProps} {...props}>
            {children || null}
        </TasksList>,
    );

    return {
        ...result,
        getItems: () => screen.getAllByRole("listitem"),
        getCompleteButton: (item: HTMLElement) =>
            within(item).getByTestId("task-list-item-complete-button"),
    };
};

describe("Render", () => {
    it("Main success scenario", () => {
        const TASKS = ["Task 1", "Task 2"];
        const { getItems } = renderComponent({
            children: [
                <TasksListItem id="1" key="1">
                    {TASKS[0]}
                </TasksListItem>,
                <TasksListItem id="2" key="2">
                    {TASKS[1]}
                </TasksListItem>,
            ],
        });

        const items = getItems();

        expect(items).toHaveLength(2);
        expect(items[0]).toHaveTextContent(TASKS[0]);
        expect(items[1]).toHaveTextContent(TASKS[1]);
    });
});

describe("Complete a task", () => {
    it("Main success scenario", () => {
        const ON_COMPLETE = jest.fn();
        const { getItems, getCompleteButton } = renderComponent({
            children: [
                <TasksListItem id="1" key="1">
                    Task 1
                </TasksListItem>,
                <TasksListItem id="2" key="2">
                    Task 2
                </TasksListItem>,
            ],
            onComplete: ON_COMPLETE,
        });

        // Click on the first item
        fireEvent.click(getCompleteButton(getItems()[0]));
        expect(ON_COMPLETE).toHaveBeenCalledWith("1");

        // Click on the second item
        fireEvent.click(getCompleteButton(getItems()[1]));
        expect(ON_COMPLETE).toHaveBeenCalledWith("2");
    });
});
