import { rest } from "msw";
import { setupServer as setupMSWServer } from "msw/node";

export const suppressRenderError = () => {
    jest.spyOn(console, "error")
        .mockImplementationOnce(() => jest.fn())
        .mockImplementationOnce(() => jest.fn());
};

// type CreateRendererParams<T> = {
//     Component: React.ComponentType<T>;
//     defaultProps: T;
//     locators: (props: T) => Record<string, () => ReturnType<typeof byTestId>>;
// };

// export const createRenderer = <T extends object, L extends Function>({
//     Component,
//     defaultProps,
//     locators: L,
// }: CreateRendererParams<T>): ((props: DeepPartial<T>) => ReturnType<typeof L>) => {
//     return (props: DeepPartial<T>) => {
//         const utils = render(
//             <IntlProvider locale="en" messages={enMessages}>
//                 <Component {...defaultProps} {...props} />
//             </IntlProvider>,
//         );

//         return {
//             // ...utils,
//             locators,
//         };
//     };
// };

export const setupServer = ({
    response = [],
    status = 200,
    url = "/",
    method = "GET",
    delay,
}: {
    response: any;
    status?: number;
    url?: string;
    method?: "GET" | "PATCH";
    delay?: number;
}) => {
    const methodsMap = {
        GET: "get",
        PATCH: "patch",
    } as const;
    const handlers = [
        rest[methodsMap[method]](url, async (_, res, ctx) => {
            if (delay) {
                await ctx.delay(delay);
            }

            return res(ctx.status(status), ctx.json(response));
        }),
    ];
    const server = setupMSWServer(...handlers);
    server.listen({
        onUnhandledRequest: "warn",
    });

    return {
        closeServer: () => {
            server.resetHandlers();
            server.close();
        },
    };
};
