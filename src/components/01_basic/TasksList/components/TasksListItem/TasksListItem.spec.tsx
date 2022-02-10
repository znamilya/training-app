import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import faker from "faker";

import { buildTask } from "../../../../../enteties/task/factory";

import TasksListItem, { TasksListItemProps } from "./TasksListItem";

export const renderComponent = (props: Partial<TasksListItemProps>) => {
    const defaultProps: TasksListItemProps = {
        ...buildTask(),
        onComplete: () => {},
        onStart: () => {},
        onStop: () => {},
        onRemove: () => {},
    };

    const utils = render(<TasksListItem {...defaultProps} {...props} />);

    return {
        ...utils,
        getTitle: () => screen.getByTestId("tasks-list-item-title"),
        getCompleteCheckbox: () =>
            screen.getByRole("checkbox", {
                name: "Complete the task",
            }),
        getStartButton: () => screen.getByRole("button", { name: "start" }),
        queryStartButton: () => screen.queryByRole("button", { name: "start" }),
        getStopButton: () => screen.getByRole("button", { name: "stop" }),
        queryStopButton: () => screen.queryByRole("button", { name: "stop" }),
        getEditButton: () => screen.getByRole("button", { name: "edit" }),
        queryEditButton: () => screen.queryByRole("button", { name: "edit" }),
        getRemoveButton: () => screen.getByRole("button", { name: "remove" }),
        queryRemoveButton: () => screen.queryByRole("button", { name: "remove" }),
    };
};

describe("Render", () => {
    it("renders required elements", () => {
        const TITLE = faker.datatype.string(5);
        const { getTitle, queryEditButton, queryRemoveButton } = renderComponent({
            title: TITLE,
        });

        expect(getTitle()).toHaveTextContent(TITLE);
        expect(queryEditButton()).toBeInTheDocument();
        expect(queryRemoveButton()).toBeInTheDocument();
    });

    describe("When the task is not completed", () => {
        it("renders checkbox unchecked", () => {
            const { getCompleteCheckbox } = renderComponent({ isComplete: false });

            expect(getCompleteCheckbox()).not.toBeChecked();
        });

        describe("And the task is not next action", () => {
            it("renders start button and doesn't render stop button", () => {
                const { queryStartButton, queryStopButton } = renderComponent({
                    isComplete: false,
                    isNextAction: false,
                });

                expect(queryStartButton()).toBeInTheDocument();
                expect(queryStopButton()).not.toBeInTheDocument();
            });
        });

        describe("And the task is next action", () => {
            it("renders stop button and doesn't render start button", () => {
                const { queryStartButton, queryStopButton } = renderComponent({
                    isComplete: false,
                    isNextAction: true,
                });

                expect(queryStartButton()).not.toBeInTheDocument();
                expect(queryStopButton()).toBeInTheDocument();
            });
        });
    });

    describe("When the task is completed", () => {
        it("renders checkbox checked", () => {
            const { getCompleteCheckbox } = renderComponent({ isComplete: true });

            expect(getCompleteCheckbox()).toBeChecked();
        });

        it("doesn't render start or stop buttons", () => {
            const { queryStartButton, queryStopButton } = renderComponent({ isComplete: true });

            expect(queryStartButton()).not.toBeInTheDocument();
            expect(queryStopButton()).not.toBeInTheDocument();
        });
    });
});

describe("Toggle the task complete", () => {
    describe("When the task is not completed", () => {
        it("calls onComplete callback with task id and True", () => {
            const TASK_ID = faker.datatype.uuid();
            const onCompleteMock = jest.fn();
            const { getCompleteCheckbox } = renderComponent({
                id: TASK_ID,
                isComplete: false,
                onComplete: onCompleteMock,
            });

            userEvent.click(getCompleteCheckbox());
            expect(onCompleteMock).toHaveBeenCalledTimes(1);
            expect(onCompleteMock).toHaveBeenCalledWith(TASK_ID, true);
        });
    });

    describe("When the task is completed", () => {
        it("calls onComplete callback with task id and False", () => {
            const TASK_ID = faker.datatype.uuid();
            const onCompleteMock = jest.fn();
            const { getCompleteCheckbox } = renderComponent({
                id: TASK_ID,
                isComplete: true,
                onComplete: onCompleteMock,
            });

            userEvent.click(getCompleteCheckbox());
            expect(onCompleteMock).toHaveBeenCalledTimes(1);
            expect(onCompleteMock).toHaveBeenCalledWith(TASK_ID, false);
        });
    });
});

describe("Start the task", () => {
    it("calls onStart callback with task id when click on start button", () => {
        const TASK_ID = faker.datatype.uuid();
        const onStartMock = jest.fn();
        const { getStartButton } = renderComponent({
            id: TASK_ID,
            isComplete: false,
            isNextAction: false,
            onStart: onStartMock,
        });

        userEvent.click(getStartButton());
        expect(onStartMock).toHaveBeenCalledTimes(1);
        expect(onStartMock).toHaveBeenCalledWith(TASK_ID);
    });
});

describe("Stop the task", () => {
    it("calls onStop callback with task id when click on stop button", () => {
        const TASK_ID = faker.datatype.uuid();
        const onStopMock = jest.fn();
        const { getStopButton } = renderComponent({
            id: TASK_ID,
            isComplete: false,
            isNextAction: true,
            onStop: onStopMock,
        });

        userEvent.click(getStopButton());
        expect(onStopMock).toHaveBeenCalledTimes(1);
        expect(onStopMock).toHaveBeenCalledWith(TASK_ID);
    });
});

// describe("Edit the task", () => {
//     it("calls onEdit callback with task id when click on edit button", () => {
//         const TASK_ID = faker.datatype.uuid();
//         const onEditMock = jest.fn();
//         const { getEditButton } = renderComponent({
//             id: TASK_ID,
//             onEdit: onEditMock,
//         });

//         userEvent.click(getEditButton());
//         expect(onEditMock).toHaveBeenCalledTimes(1);
//         expect(onEditMock).toHaveBeenCalledWith(TASK_ID);
//     });
// });

describe("Remove the task", () => {
    it("calls onRemove callback with task id when click on edit button", () => {
        const TASK_ID = faker.datatype.uuid();
        const onRemoveMock = jest.fn();
        const { getRemoveButton } = renderComponent({
            id: TASK_ID,
            onRemove: onRemoveMock,
        });

        userEvent.click(getRemoveButton());
        expect(onRemoveMock).toHaveBeenCalledTimes(1);
        expect(onRemoveMock).toHaveBeenCalledWith(TASK_ID);
    });
});
