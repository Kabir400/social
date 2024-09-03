import "../css/nav.css";
import React from "react";

function Nav() {
  return (
    <div>
      <nav className="navbar">
        <div className="navbar-logo">MySite</div>
        <ul className="navbar-links">
          <li>
            <a href="#posts">Posts</a>
          </li>
          <li>
            <a href="#creator">Creator</a>
          </li>
          <li>
            <a href="#my-account">My Account</a>
          </li>
          <li>
            <a href="#login">Login</a>
          </li>
          <li>
            <a href="#signup" className="signup-btn">
              Signup
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Nav;
