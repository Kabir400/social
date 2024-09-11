import "../css/nav.css";
import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <div>
      <nav className="navbar">
        <div className="navbar-logo">MySite</div>
        <ul className="navbar-links">
          <li>
            <Link to={"/"}>Posts</Link>
          </li>
          <li>
            <Link to={"/"}>Creator</Link>
          </li>
          <li>
            <Link to={"/myaccount"}>My Account</Link>
          </li>
          <li>
            <Link to={"/login"}>Login</Link>
          </li>
          <li>
            <Link to={"/signup"} className="signup-btn">
              Signup
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Nav;
