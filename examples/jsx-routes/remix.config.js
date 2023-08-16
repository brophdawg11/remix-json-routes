const { jsxRoutes } = require("remix-json-routes");
const routes = require("./routes");

/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  // Ignore everything routes, we'll define them all via routes()
  ignoredRouteFiles: ["**/*"],
  serverModuleFormat: "cjs",
  future: {
    v2_dev: true,
    v2_errorBoundary: true,
    v2_headers: true,
    v2_meta: true,
    v2_normalizeFormMethod: true,
    v2_routeConvention: true,
  },
  routes: (defineRoute) => jsxRoutes(defineRoute, routes),
};
