import { logRoles, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TestComponent from "./TestComponent";

describe("test", () => {
    it("xxxx", async () => {
        const { container } = render(<TestComponent />);

        const button = screen.getByRole("button", {
            name: "Show",
        });

        userEvent.click(button);

        await waitFor(() => {
            const elem = screen.getByText("Jopa");
            expect(elem).toBeInTheDocument();
        });

        logRoles(container);
    });
});
