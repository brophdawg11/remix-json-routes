import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

export default function App() {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <h1>Remix JSX Routes Example Application</h1>
        <nav>
          <Link to="/">Home</Link>
          {" | "}
          <Link to="/parent">Parent</Link>
          {" | "}
          <Link to="/parent/child">Child</Link>
        </nav>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
