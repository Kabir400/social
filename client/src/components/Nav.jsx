import "../css/nav.css";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Nav({ isLogin, setIsLogin }) {
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const res = await fetch("http://localhost:4040/api/v1/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      if (!data.success) {
        alert(data.message);
      }
      alert(data.message);
      setIsLogin(false);
      navigate("/login");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-logo">MySite</div>
        <ul className="navbar-links">
          {isLogin ? (
            <>
              <li>
                <Link to={"/"}>Posts</Link>
              </li>
              <li>
                <Link to={"/"}>Creator</Link>
              </li>
              <li>
                <Link to={"/myaccount"}>My Account</Link>
              </li>
              <li className="logout" onClick={logoutHandler}>
                Logout
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to={"/login"}>Login</Link>
              </li>
              <li>
                <Link to={"/signup"} className="signup-btn">
                  Signup
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Nav;
