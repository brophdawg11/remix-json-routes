const React = require("react");

function jsxRoutes(defineRoutes, routes) {
  return jsonRoutes(defineRoutes, createRoutesFromElements(routes));
}

function jsonRoutes(defineRoutes, routes) {
  return defineRoutes((route) => routes.forEach((r) => defineRoute(route, r)));
}

function defineRoute(routeFn, jsonRoute) {
  let path = jsonRoute.path;
  let file = jsonRoute.file;
  let children = jsonRoute.children;
  let opts = { ...jsonRoute };
  delete opts.path;
  delete opts.file;
  if (children) {
    routeFn(path, file, opts, () => {
      children.forEach((c) => defineRoute(routeFn, c));
    });
  } else {
    routeFn(path, file, opts);
  }
}

function Route() {
  throw new Error("<Route> is for defining routes, not for rendering");
}

function createRoutesFromElements(children, parentPath = []) {
  let routes = [];

  React.Children.forEach(children, (element, index) => {
    let treePath = [...parentPath, index];

    if (element.type === React.Fragment) {
      routes.push(...createRoutesFromElements(element.props.children, treePath));
      return;
    }

    if (element.type !== Route) {
      let type =
        typeof element.type === "string" ? element.type : element.type.name;
      throw new Error(
        `Only <Route> elements are supported, found type: ${type}`
      );
    }

    if (element.props.index && element.props.children) {
      throw new Error("An index route cannot have child routes.");
    }

    let route = {
      id: element.props.id || treePath.join("-"),
      ...element.props,
    };

    if (element.props.children) {
      route.children = createRoutesFromElements(
        element.props.children,
        treePath
      );
    }

    routes.push(route);
  });

  return routes;
}

module.exports = {
  jsonRoutes,
  jsxRoutes,
  Route,
};
