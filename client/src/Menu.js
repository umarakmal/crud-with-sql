import React from "react";
import logo from "./images/logo_new.png";
import { Link, useLocation } from "react-router-dom";
// import Dropdown from "react-bootstrap/Dropdown";
// import { isAuth } from "./components/auth/helpers";
const Menu = () => {
  const location = useLocation();


  return (
    <>
      <aside
        // style={{ fontSize: "12px" }}
        className="main-sidebar sidebar-dark-primary elevation-4"
      >
        <Link to="#" className="brand-link" style={{ backgroundColor: 'whitesmoke' }}>
          <img
            src={logo}
            alt="Logo"
            className="brand-image"
            style={{ opacity: "5", maxHeight: "43px", marginLeft: '4.1rem' }}
          />
        </Link>
        <div className="sidebar">
          <nav className="mt-4">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item  mb-2">
                <Link
                  to="/user-manage"
                  className={`nav-link ${location.pathname === "/user-manage" ? "active" : ""
                    }`}
                >
                  <i
                    className="nav-icon far fa-file"
                    style={{
                      color: "white",
                      fontSize: "12px",
                      marginRight: "20px",
                    }}
                  />
                  <p style={{ color: "white", fontSize: "12px" }}>
                    User Management
                  </p>
                </Link>
              </li>
              <li className="nav-item  mb-2 ">
                <Link
                  to="/datatable"
                  className={`nav-link ${location.pathname === "/datatable" ? "active" : ""
                    }`}
                >
                  <i
                    className="nav-icon far fa-file"
                    style={{
                      color: "white",
                      fontSize: "12px",
                      marginRight: "20px",
                    }}
                  />
                  <p style={{ color: "white", fontSize: "12px" }}>
                    Table
                  </p>
                </Link>
              </li>
              <li className="nav-item  mb-2 ">
                <Link
                  to="/upload"
                  className={`nav-link ${location.pathname === "/upload" ? "active" : ""
                    }`}
                >
                  <i
                    className="nav-icon far fa-file"
                    style={{
                      color: "white",
                      fontSize: "12px",
                      marginRight: "20px",
                    }}
                  />
                  <p style={{ color: "white", fontSize: "12px" }}>
                    Upload Data
                  </p>
                </Link>
              </li>
              <li className="nav-item  mb-2 ">
                <Link
                  to="/report"
                  className={`nav-link ${location.pathname === "/report" ? "active" : ""
                    }`}
                >
                  <i
                    className="nav-icon far fa-file"
                    style={{
                      color: "white",
                      fontSize: "12px",
                      marginRight: "20px",
                    }}
                  />
                  <p style={{ color: "white", fontSize: "12px" }}>
                    Get Report
                  </p>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Menu;
