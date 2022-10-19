import React from "react";
import { Outlet } from "react-router-dom";

export default function DashboardSidebar() {
  return (
    <section className="dashboard">
      <div>Sidebar</div>
      <Outlet />
    </section>
  );
}
