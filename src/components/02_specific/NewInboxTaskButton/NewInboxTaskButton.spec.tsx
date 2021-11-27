import { render } from "@testing-library/react";

import NewInboxTaskButton from "./NewInboxTaskButton";

const renderComponent = () => {
    const result = render(<NewInboxTaskButton />);

    return {
        ...result,
        root: result.container.firstChild as HTMLElement,
    };
};

describe("Render", () => {
    it("Main success scenario", () => {
        const { root } = renderComponent();

        // Should have proper text
        expect(root).toHaveTextContent("Add a task");
    });
});
