import { buildEmptyRootState } from "../../../factories";
import { selectActive, selectById } from "../selectors";
import { createProject } from "../../../../enteties/project/factory";

describe("selectById", () => {
    describe("when there is no project with the given id", () => {
        it("returns null", () => {
            const ID = "1";
            const state = buildEmptyRootState();

            expect(selectById(ID)(state)).toBeNull();
        });
    });

    describe("when there is a project with the given id", () => {
        it("returns the project", () => {
            const project = createProject();
            const state = buildEmptyRootState({
                enteties: {
                    projects: {
                        [project.id]: project,
                    },
                },
            });

            expect(selectById(project.id)(state)).toEqual(project);
        });
    });
});

describe.only("selectActive", () => {
    describe("when there are no active projects", () => {
        it("returns an empty array", () => {
            const project1 = createProject({ isActive: false });
            const project2 = createProject({ isActive: false });
            const state = buildEmptyRootState({
                enteties: {
                    projects: {
                        [project1.id]: project1,
                        [project2.id]: project2,
                    },
                },
            });

            expect(selectActive(state)).toEqual([]);
        });
    });

    describe("when there are some active projects", () => {
        it("returns an array of active projects", () => {
            const project1 = createProject({ isActive: false });
            const project2 = createProject({ isActive: true });
            const project3 = createProject({ isActive: true });
            const state = buildEmptyRootState({
                enteties: {
                    projects: {
                        [project1.id]: project1,
                        [project2.id]: project2,
                        [project3.id]: project3,
                    },
                },
            });

            expect(selectActive(state)).toHaveLength(2);
            expect(selectActive(state)).toEqual(expect.arrayContaining([project2, project3]));
        });
    });
});
