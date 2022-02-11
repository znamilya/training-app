import { route, stringParser } from "typesafe-routes";

const main = route("/", {}, {});
const inbox = route("/inbox", {}, {});
const today = route("/today", {}, {});
const projects = route("/projects", {}, {});
const completedProjects = route("/completed-projects", {}, {});
const project = route(
    "/projects/:projectId",
    {
        projectId: stringParser,
    },
    {},
);
const categories = route("/categories", {}, {});

const routes = {
    main,
    inbox,
    today,
    projects,
    completedProjects,
    project,
    categories,
};

export default routes;
