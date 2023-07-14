# Remix JSON Routes

`remix-json-routes` is a package to allow you to define your Remix routes from a custom JSON structure, instead of (or in addition to ) the built in file-based routing convention.

## Installation

```sh
npm install remix-json-routes
```

## Using JSON Routes

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
            file: "routes/some/path/to/home.tsx",
          },
          {
            path: "about",
            file: "routes/some/path/to/about.tsx",
          },
        ],
      },
    ]);
  },
};
```

## Using JSX Routes

`remix.config.js` does not support JSX out of the box, but with a small prebuild step you can also define your routes with JSX. The easiest way to do this is to put your JSX route definitions in a `route.jsx` file that is transpiled to a `routes.js` file as a prebuild step which you can then `require` from `remix.config.js`.

**Create your routes.jsx file**

This file should export your JSX tree using the `Route` component from `remix-json-routes`:

```jsx
const React = require("react");
const { Route } = require("remix-json-routes");

module.exports = (
  <Route path="/" file="routes/layout.tsx">
    <Route index file="routes/some/path/to/home.tsx" />
    <Route path="about" file="routes/testsome/path/to/about.tsx" />
  </Route>
);
```

**Create a prebuild step to build `routes.js`**

Add a `jsxroutes` script to `package.json` that will transpile `routes.jsx` to `routes.js`, then add `prebuild`/`predev` scripts so we always build a fresh version of `routes.js` before `npm run build`/`npm run dev`:

```json
{
  "scripts": {
    "jsxroutes": "esbuild routes.jsx --format=cjs --outfile=routes.js",
    "prebuild": "npm run jsxroutes",
    "predev": "npm run jsxroutes",
    "build": "remix build",
    "dev": "remix dev",
    "...": "..."
  }
}
```

> **Note**
> You will probably want to add `routes.js` to your `.gitignore` file as well.

**Edit your remix.config.js to use `jsxRoutes`**

```js
// remix.config.js
const { jsxRoutes } = require("remix-json-routes");
const routes = require("./routes");

/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ["**/*"],
  routes(defineRoute) {
    return jsxRoutes(defineRoute, routes);
  },
};
```
