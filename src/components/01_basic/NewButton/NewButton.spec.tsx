import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { byTestId, byRole } from "testing-library-selector";
import faker from "faker";

import NewButton, { NewButtonProps } from "./NewButton";

const renderComponent = (props: Partial<NewButtonProps> = {}) => {
    const defaultProps: NewButtonProps = {
        addButtonText: "Add",
        onCreate: () => {},
    };
    const finalProps: NewButtonProps = {
        ...defaultProps,
        ...props,
    };

    const utils = render(<NewButton {...finalProps} />);

    return {
        ...utils,
        // eslint-disable-next-line testing-library/no-node-access
        root: utils.container.firstChild as HTMLElement,
        addButton: byRole("button", { name: finalProps.addButtonText }),
        titleInput: byRole("textbox", { name: "title" }),
        submitButton: byRole("button", { name: finalProps.addButtonText }),
        cancelButton: byRole("button", { name: "Cancel" }),
        addForm: byTestId("add-form"),
    };
};

describe("Render", () => {
    it("shows only Add button", () => {
        const { addButton, addForm } = renderComponent();

        expect(addButton.get()).toBeInTheDocument();
        expect(addForm.query()).not.toBeInTheDocument();
    });
});

describe("Add", () => {
    it("allow to add", () => {
        const VALUE = faker.datatype.string(4);
        const onCreateMock = jest.fn();
        const { addButton, titleInput, submitButton, addForm } = renderComponent({
            onCreate: onCreateMock,
        });

        userEvent.click(addButton.get());

        expect(addForm.get()).toBeInTheDocument();

        userEvent.type(titleInput.get(), VALUE);
        userEvent.click(submitButton.get());

        expect(addForm.query()).not.toBeInTheDocument();
        expect(onCreateMock).toHaveBeenCalledTimes(1);
        expect(onCreateMock).toHaveBeenCalledWith(VALUE);

        // Open the form again to check that the previously entered value has been cleared
        userEvent.click(addButton.get());

        expect(titleInput.get()).toHaveValue("");
    });
});

describe("Cancel adding", () => {
    it("allow to cancel adding", () => {
        const { addButton, titleInput, cancelButton, addForm } = renderComponent();

        userEvent.click(addButton.get());

        expect(addForm.get()).toBeInTheDocument();

        // Type something
        userEvent.type(titleInput.get(), "blabla");
        // // Cancel adding
        userEvent.click(cancelButton.get());

        expect(addForm.query()).not.toBeInTheDocument();

        // Open the form again to check that previously entered value was cleared
        userEvent.click(addButton.get());

        expect(titleInput.get()).toHaveValue("");
    });
});
