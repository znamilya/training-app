import faker from "faker";
import { create } from "../actions";

describe("create", () => {
    it("returns the payload", () => {
        const TITLE = faker.datatype.string(5);

        expect(create({ title: TITLE })).toMatchObject({
            payload: {
                // TODO: Mock nanoid
                id: expect.any(String),
                title: TITLE,
            },
        });
    });
});
