import { render } from "@testing-library/react";

import TaskCounter, { TaskCounterProps } from "./TaskCounter";

const renderComponent = (props: Partial<TaskCounterProps>) => {
    const defaultProps = {
        value: 1,
    };

    const result = render(<TaskCounter {...defaultProps} {...props} />);

    return {
        ...result,
        rootNode: result.container.firstChild,
    };
};

describe("Render", () => {
    it("Main success scenario", () => {
        const VALUE = 10;
        const { rootNode } = renderComponent({
            value: VALUE,
        });

        expect(rootNode).toHaveTextContent(`${VALUE}`);
    });
});
