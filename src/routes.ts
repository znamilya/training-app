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

const routes = {
    inbox,
    today,
    projects,
    project,
};

export default routes;
