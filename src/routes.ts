import { route, stringParser } from "typesafe-routes";

const inbox = route("/inbox", {}, {});
const today = route("/today", {}, {});
const projects = route("/projects", {}, {});
const project = route(
    "/projects/:projectId",
    {
        projectId: stringParser,
    },
    {},
);
const categories = route("/categories", {}, {});

const routes = {
    inbox,
    today,
    projects,
    project,
    categories,
};

export default routes;
