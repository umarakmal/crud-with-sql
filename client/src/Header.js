import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { isAuth, signout } from "./components/auth/helpers";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div>
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link
              className="nav-link"
              data-widget="pushmenu"
              to="#"
              role="button"
            >
              <i className="fas fa-bars" />
            </Link>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item dropdown">

            <Link className="nav-link" data-toggle="dropdown" to="#" aria-expanded>

            </Link>
            <div className="dropdown-menu dropdown-menu-lg" style={{ minWidth: '100%' }}>
              {isAuth() && (
                <ul item xs>
                  <li label="Logout" className="nav-link"
                    style={{ cursor: "pointer", color: "black" }}
                    onClick={() => {
                      signout(() => {
                        navigate("/");
                      })
                    }}
                    variant="outlined"
                  >Logout</li>
                </ul>
              )}


            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
