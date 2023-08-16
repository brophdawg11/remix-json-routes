const React = require("react");
const { Route } = require("remix-json-routes");

module.exports = (
  <Route path="/" file="routes/layout.tsx">
    <Route index file="routes/home.tsx" />
    <Route path="parent" file="routes/parent.tsx">
      <Route path="child" file="routes/child.tsx" />
    </Route>
  </Route>
);
