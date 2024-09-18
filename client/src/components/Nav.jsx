import "../css/nav.css";
import React from "react";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

//....................................

const logoutRequest = async () => {
  const res = await fetch("http://localhost:4040/api/v1/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }
  return data;
};

//........................................
function Nav({ isLogin }) {
  const queryClient = useQueryClient();

  //mutation logic for logout
  const mutation = useMutation({
    mutationFn: logoutRequest,
    onSuccess: (data) => {
      if (data.success) {
        alert(data.message);
        queryClient.invalidateQueries(["isLogin"]);
      }
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  // Logout handler
  const logoutHandler = () => {
    mutation.mutate();
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
