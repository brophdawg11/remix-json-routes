"use strict";
var import_jsx_runtime = require("react/jsx-runtime");
const React = require("react");
const { Route } = require("remix-json-routes");
module.exports = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Route, { path: "/", file: "routes/layout.tsx", children: [
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, { index: true, file: "routes/home.tsx" }),
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, { path: "parent", file: "routes/parent.tsx", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, { path: "child", file: "routes/child.tsx" }) })
] });
