# Remix JSON Routes

`remix-json-routes` is a package to allow you to define your Remix routes from a custom JSON structure, instead of (or in addition to ) the built in file-based routing convention.

## Installation

```sh
npm install remix-json-routes
```

## Usage

You leverage this package via the `routes` function in `remix.config.js`. The second argument to `jsonRoutes` is an array of routes similar to what you would pass to [`createBrowserRouter`](https://reactrouter.com/en/main/routers/create-browser-router) in React Router, where you define the route path information (`path`, `index`, `children`), but then instead of specifying an `element`/`action`/`loader`/etc., you specify the `file` path pointing to a Remix route file which exports those aspects.

```js
const { jsonRoutes } = require("remix-json-routes");

/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  // Note this ignores everything in routes/ giving you complete control over
  // your routes.  If you want to define routes in addition to what's in routes/,
  // change this to "ignoredRouteFiles": ["**/.*"].
  ignoredRouteFiles: ["**/*"],
  routes(defineRoutes) {
    return jsonRoutes(defineRoutes, [
      {
        path: "/",
        file: "routes/layout.tsx",
        children: [
          {
            index: true,
            file: "some/path/to/home.tsx",
          },
          {
            path: "about",
            file: "some/path/to/about.tsx",
          },
        ],
      },
    ]);
  },
};
```
