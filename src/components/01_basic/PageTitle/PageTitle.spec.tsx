import { render } from "@testing-library/react";
import faker from "faker";

import PageTitle, { PageTitleProps } from "./PageTitle";

const renderComponent = (props: Partial<PageTitleProps> = {}) => {
    const defaultProps = {
        children: "",
    };

    const utils = render(<PageTitle {...defaultProps} {...props} />);

    return {
        ...utils,
        // eslint-disable-next-line testing-library/no-node-access
        rootNode: utils.container.firstChild as HTMLElement,
    };
};

describe("Render", () => {
    it("renders page title", () => {
        const TITLE = faker.datatype.string(10);
        const { rootNode } = renderComponent({
            children: TITLE,
        });

        expect(rootNode.tagName).toBe("H1");
        expect(rootNode).toHaveTextContent(TITLE);
    });
});
