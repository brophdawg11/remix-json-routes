import { Outlet } from "@remix-run/react";

export default function Layout() {
  return (
    <>
      <h2>Layout Route</h2>
      <Outlet />
    </>
  );
}
