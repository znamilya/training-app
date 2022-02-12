import { render } from "@testing-library/react";
import faker from "faker";

import TaskCounter, { TaskCounterProps } from "./TaskCounter";

const renderComponent = (props: Partial<TaskCounterProps>) => {
    const defaultProps = {
        value: 1,
        totalCount: 10,
    };

    const utils = render(<TaskCounter {...defaultProps} {...props} />);

    return {
        ...utils,
        // eslint-disable-next-line testing-library/no-node-access
        rootNode: utils.container.firstChild,
    };
};

describe("Render", () => {
    it("renders counter", () => {
        const VALUE = faker.datatype.number({ min: 0, max: 10 });
        const { rootNode } = renderComponent({
            value: VALUE,
        });

        expect(rootNode).toHaveTextContent(`${VALUE}`);
    });
});
