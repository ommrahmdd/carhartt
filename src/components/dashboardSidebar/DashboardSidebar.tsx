import React from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { closeSidebar, openSidebar } from "./utils";
import { IDashboard } from "./dashboard.model";
export default function DashboardSidebar() {
  let dashboard_element: IDashboard[] = [
    {
      to: "",
      element: "Add Product",
    },
    {
      to: "/home-ui",
      element: "Edit Home Ui",
    },
    {
      to: "/editLookbook",
      element: "Edit Lookbook",
    },
  ];
  return (
    <section className="dashboard">
      {/* STYLE: sidebar button */}
      <button
        className="customBtn sBtn dashboard__sidebarBtn"
        onClick={openSidebar}
      >
        <span>&rsaquo;</span>
      </button>
      {/* STYLE: sidebar  */}
      <div className="dashboard__sidebar" onClick={closeSidebar}>
        <ul className="sideElements">
          {dashboard_element.map((element, index) => (
            <li className="sideElements__element">
              <Link
                to={`/dashboard${element.to}`}
                className="linkBtn sideElements__element-link"
              >
                {element.element}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="dashboard__overlay" onClick={closeSidebar}></div>
      <div className="dashboard__outlet">
        <Outlet />
      </div>
    </section>
  );
}
