import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../css/login.css";
const Login = ({ setIsLogin }) => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [loding, setLoding] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoding(true);
    try {
      const response = await fetch("http://localhost:4040/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(loginData),
      });
      const data = await response.json();

      if (data.success == false) {
        alert(data.message);
        setLoding(false);
      } else {
        alert(data.message);
        setIsLogin(true);
        setLoding(false);
        navigate("/");
      }
    } catch (error) {
      alert(error.message);
      setLoding(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={loginData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={loginData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">{loding ? "Loding..." : "Log In"}</button>
      </form>
    </div>
  );
};

export default Login;
