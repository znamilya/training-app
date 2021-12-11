import faker from "faker";
import { AnyAction } from "redux";
import { createProject } from "../../../../enteties/project/factory";
import { create, remove, rename, start, stop } from "../actions";
import projectsSlice from "../projects";

const reducer = projectsSlice.reducer;

it("returns the initial state", () => {
    const state = reducer(undefined, {} as AnyAction);

    expect(state).toStrictEqual({
        "1-orphans": { id: "1-orphans", title: "Orphans", isActive: false, tasks: [] },
    });
});

describe("create", () => {
    it("creates a new project with the given title", () => {
        // const ID = faker.datatype.uuid();
        const TITLE = faker.lorem.sentence(3);
        const action = create({ title: TITLE });
        const state = reducer(undefined, action);

        expect(state[action.payload.id]).toStrictEqual({
            id: action.payload.id,
            title: TITLE,
            tasks: [],
            isActive: false,
        });
    });
});

describe("remove", () => {
    describe("When project with passed id exists", () => {
        it("removes the project", () => {
            const project1 = createProject();
            const project2 = createProject();
            const initialState = {
                [project1.id]: project1,
                [project2.id]: project2,
            };

            const state = reducer(initialState, remove(project1.id));

            expect(state[project2.id]).toStrictEqual(project2);
            // Check that reducer haven't removed other projects
            expect(state[project1.id]).toBeUndefined();
        });
    });

    describe("When project with passed id doesn't exists", () => {
        it("does nothing", () => {
            const project1 = createProject();
            const project2 = createProject();
            const initialState = {
                [project1.id]: project1,
                [project2.id]: project2,
            };

            const state = reducer(initialState, remove(faker.datatype.uuid()));

            expect(state).toBe(initialState);
        });
    });
});

describe("rename", () => {
    describe("When a project with passed id exists", () => {
        it("renames project", () => {
            const project = createProject();
            const TITLE = faker.lorem.sentence(5);
            const initialState = {
                [project.id]: project,
            };

            const state = reducer(initialState, rename({ projectId: project.id, newTitle: TITLE }));

            expect(state[project.id]).toStrictEqual({
                ...project,
                title: TITLE,
            });
        });
    });

    describe("When a project with passed id doesn't exists", () => {
        it("does nothing", () => {
            const project = createProject();
            const TITLE = faker.lorem.sentence(5);
            const initialState = {
                [project.id]: project,
            };

            const state = reducer(
                initialState,
                rename({ projectId: faker.datatype.uuid(), newTitle: TITLE }),
            );

            expect(state).toBe(initialState);
        });
    });
});

describe("start", () => {
    describe("When a project with passed id exists", () => {
        it("marks the project as active", () => {
            const project = createProject({ isActive: false });
            const initialState = {
                [project.id]: project,
            };

            const state = reducer(initialState, start(project.id));

            expect(state[project.id]).toStrictEqual({
                ...project,
                isActive: true,
            });
        });
    });

    describe("When a project with passed id doesn't exists", () => {
        it("does nothing", () => {
            const project = createProject();
            const initialState = {
                [project.id]: project,
            };

            const state = reducer(initialState, start(faker.datatype.uuid()));

            expect(state).toBe(initialState);
        });
    });
});

describe("stop", () => {
    describe("When a project with passed id exists", () => {
        it("marks the project as not active", () => {
            // Create an active project
            const project = createProject({ isActive: true });
            const initialState = {
                [project.id]: project,
            };

            const state = reducer(initialState, stop(project.id));

            expect(state[project.id]).toStrictEqual({
                ...project,
                isActive: false,
            });
        });
    });

    describe("When a project with passed id doesn't exists", () => {
        it("does nothing", () => {
            const project = createProject();
            const initialState = {
                [project.id]: project,
            };

            const state = reducer(initialState, start(faker.datatype.uuid()));

            expect(state).toBe(initialState);
        });
    });
});

describe("Normalization", () => {
    describe("When there are projects in normalized entities", () => {
        it("add projects", () => {
            const project1 = createProject();
            const project2 = createProject();
            const normalizedAction: AnyAction = {
                type: "any",
                payload: {
                    result: [project1.id, project2.id],
                    entities: {
                        projects: {
                            [project1.id]: project1,
                            [project2.id]: project2,
                        },
                    },
                },
            };

            const state = reducer(undefined, normalizedAction);

            expect(state).toMatchObject({
                [project1.id]: project1,
                [project2.id]: project2,
            });
        });
        it("merges new project with existing one", () => {
            const oldProject = createProject();
            const newProject = createProject({ ...oldProject, title: faker.lorem.sentence(3) });
            const initialState = {
                [oldProject.id]: oldProject,
            };
            const normalizedAction: AnyAction = {
                type: "any",
                payload: {
                    result: [newProject.id],
                    entities: {
                        projects: {
                            [newProject.id]: newProject,
                        },
                    },
                },
            };

            const state = reducer(initialState, normalizedAction);

            expect(state).toMatchObject({
                [oldProject.id]: newProject,
            });
        });
    });
    // describe("When a project with passed id doesn't exists", () => {
    //     it("does nothing", () => {
    //         expect(state).toBe(initialState);
    //     });
    // });
});
