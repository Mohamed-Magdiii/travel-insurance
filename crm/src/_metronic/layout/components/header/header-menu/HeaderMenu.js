/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
// import SVG from "react-inlinesvg";
import { checkIsActive } from "../../../../_helpers";
// import { toAbsoluteUrl} from "../../../../_helpers";

export function HeaderMenu({ layoutProps }) {
  const location = useLocation();
  const getMenuItemActive = (url) => {
    return checkIsActive(location, url) ? "menu-item-active" : "";
  };

  return (
    <div
      id="kt_header_menu"
      className={`header-menu header-menu-mobile ${layoutProps.ktMenuClasses}`}
      {...layoutProps.headerMenuAttributes}
    >
      {/*begin::Header Nav*/}
      <ul className={`menu-nav ${layoutProps.ulClasses}`}>
        {/*begin::1 Level*/}
        <li
          className={`menu-item menu-item-rel ${getMenuItemActive(
            "/dashboard"
          )}`}
        >
          <NavLink className="menu-link" to="/dashboard">
            <span className="menu-text">Dashboard</span>
            {layoutProps.rootArrowEnabled && <i className="menu-arrow" />}
          </NavLink>
        </li>

        {/*end::1 Level*/}

        {/*begin::1 Level*/}
        <li
          data-menu-toggle={layoutProps.menuDesktopToggle}
          aria-haspopup="true"
          className={`menu-item menu-item-submenu menu-item-rel ${getMenuItemActive(
            "/setup"
          )}`}
        >
          <NavLink className="menu-link menu-toggle" to="/setup">
            <span className="menu-text">Setup</span>
            <i className="menu-arrow"></i>
          </NavLink>
          <div className="menu-submenu menu-submenu-classic menu-submenu-left">
            <ul className="menu-subnav">
              {/*begin::2 Level*/}
              <li className={`menu-item ${getMenuItemActive("/setup/covers")}`}>
                <NavLink
                  className="menu-link"
                  to="/setup/covers"
                >
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">covers</span>
                </NavLink>
              </li>
              {/*end::2 Level*/}
              {/*begin::2 Level*/}
              <li className={`menu-item ${getMenuItemActive("/setup/customers")}`}>
                <NavLink
                  className="menu-link"
                  to="/setup/customers"
                >
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">Customers</span>
                </NavLink>
              </li>
              {/*end::2 Level*/}
              {/*begin::2 Level*/}
              <li className={`menu-item ${getMenuItemActive("/setup/products")}`}>
                <NavLink
                  className="menu-link"
                  to="/setup/products"
                >
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">Products</span>
                </NavLink>
              </li>
              {/*end::2 Level*/}

              {/*begin::2 Level*/}
              <li
                className={`menu-item menu-item-submenu ${getMenuItemActive(
                  "/setup/users"
                )}`}
                data-menu-toggle="hover"
                aria-haspopup="true"
              >
                <NavLink
                  className="menu-link menu-toggle"
                  to="/setup/users"
                >
                  <span className="svg-icon menu-icon">
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  </span>
                  <span className="menu-text">Users</span>
                  <i className="menu-arrow" />
                </NavLink>
                <div
                  className={`menu-submenu menu-submenu-classic menu-submenu-right`}
                >
                  <ul className="menu-subnav">
                    {/*begin::3 Level*/}
                    <li
                      className={`menu-item ${getMenuItemActive(
                        "/setup/users/all-users"
                      )}`}
                    >
                      <NavLink
                        className="menu-link"
                        to="/setup/users/all-users"
                      >
                        <i className="menu-bullet menu-bullet-dot">
                          <span />
                        </i>
                        <span className="menu-text">all-users</span>
                      </NavLink>
                    </li>
                    {/*end::3 Level*/}

                    {/*begin::3 Level*/}
                    <li
                      className={`menu-item ${getMenuItemActive(
                        "/setup/users/unlock-users"
                      )}`}
                    >
                      <NavLink
                        className="menu-link"
                        to="/setup/users/unlock-users"
                      >
                        <i className="menu-bullet menu-bullet-dot">
                          <span />
                        </i>
                        <span className="menu-text">Unlock-users</span>
                      </NavLink>
                    </li>
                    {/*end::3 Level*/}
                  </ul>
                </div>
              </li>
              {/*end::2 Level*/}
            </ul>
          </div>
        </li>
        {/*end::1 Level*/}
      </ul>
      {/*end::Header Nav*/}
    </div>
  );
}
