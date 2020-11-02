import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/helper";
import logo from "../logo2.png";

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return {
      color: "#0f4c5c",
      opacity: "1",
      fontWeight: "500",
      borderBottom: "5px solid #0f4c5c",
    };
  } else {
    return { color: "#0f4c5c" };
  }
};

const Menu = ({ history }) => {
  return (
    <nav
      className="navbar navbar-expand-lg static-top shadow"
      style={{
        backgroundColor: "#edddd4",
      }}
    >
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img className="image" src={logo} alt="" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav ml-auto">
            {isAuthenticated() && isAuthenticated().user.role === 1 && (
              <li className="nav-item">
                <Link
                  style={currentTab(history, "/admin/dashboard")}
                  className="nav-link"
                  to="/admin/dashboard"
                >
                  A.DashBoard
                </Link>
              </li>
            )}
            {isAuthenticated() && isAuthenticated().user.role === 0 && (
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/user/dashboard"
                  style={currentTab(history, "/user/dashboard")}
                >
                  U.DashBoard
                </Link>
              </li>
            )}
            {!isAuthenticated() && (
              <Fragment>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/signup"
                    style={currentTab(history, "/signup")}
                  >
                    SIGN UP
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/signin"
                    style={currentTab(history, "/signin")}
                  >
                    SIGN IN
                  </Link>
                </li>
              </Fragment>
            )}

            <li className="nav-item">
              <Link
                style={currentTab(history, "/cart")}
                className="nav-link"
                to="/cart"
              >
                Cart
              </Link>
            </li>
            {isAuthenticated() && (
              <li className="nav-item">
                <span
                  style={{
                    cursor: "pointer",
                    color: "#011627",
                  }}
                  className="nav-link"
                  onClick={() => {
                    signout(() => {
                      //  calling the signout function from auth/helper and pushing the user to home page
                      history.push("/");
                    });
                  }}
                >
                  Sign out
                </span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default withRouter(Menu);
