# Remix JSON Routes Ecample

This is an example Remix app using `jsxRoutes` from `remix-json-routes`. It defines a JSX route hierarchy in a `routes.jsx` file which it transpiles to `routes.js` in a `predev`/`prebuild` npm script. Then remix config can import the generated `routes.js` file and pass it to `jsxRoutes`.

You can run locally by running the following from this directory:

```sh
npm ci && npm run dev
```
