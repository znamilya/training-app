export const suppressRenderError = () => {
    jest.spyOn(console, "error")
        .mockImplementationOnce(() => jest.fn())
        .mockImplementationOnce(() => jest.fn());
};
