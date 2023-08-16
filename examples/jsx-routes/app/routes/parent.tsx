import { Outlet } from "@remix-run/react";

export default function Layout() {
  return (
    <>
      <h3>Parent Route</h3>
      <Outlet />
    </>
  );
}
