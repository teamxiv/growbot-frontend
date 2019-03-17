import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import dashboardRoutes from "../../routes/view_routes";

const Sidebar = props => {
  const { location } = props;
  const [ ,updateDimensions ] = useState(window.innerWidth);
  const activeRoute = routeName => location.pathname.indexOf(routeName) > -1 ? "active" : "";

  useEffect(() => {
    updateDimensions(window.innerWidth);
  });

  return (
    <div
      id="sidebar"
      className="sidebar"
      data-color="red"
    >
      <div className="logo">
        <div
          className="simple-text logo-normal"
        >
          GrowBot
        </div>
      </div>
      <div className="sidebar-wrapper">
        <ul className="nav">
          {dashboardRoutes.map((prop, key) => {
            if (!prop.redirect)
              return (
                <li
                  className={
                    prop.upgrade
                      ? "active active-pro"
                      : activeRoute(prop.path)
                  }
                  key={key}
                >
                  <NavLink
                    to={prop.path}
                    className="nav-link"
                    activeClassName="active"
                  >
                    <i className={prop.icon} />
                    <p>{prop.name}</p>
                  </NavLink>
                </li>
              );
            return null;
          })}
        </ul>
      </div>
    </div>
  );

};

export default Sidebar;