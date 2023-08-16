const { jsonRoutes } = require("remix-json-routes");

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
  routes(defineRoutes) {
    return jsonRoutes(defineRoutes, [
      {
        path: "/",
        file: "routes/layout.tsx",
        children: [
          {
            index: true,
            file: "routes/home.tsx",
          },
          {
            path: "parent",
            file: "routes/parent.tsx",
            children: [
              {
                path: "child",
                file: "routes/child.tsx",
              },
            ],
          },
        ],
      },
    ]);
  },
};
