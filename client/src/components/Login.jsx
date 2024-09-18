import React, { useEffect, useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import "../css/login.css";

//...............................................

const loginHandler = async (loginData) => {
  const response = await fetch("http://localhost:4040/api/v1/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(loginData),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

//.................................................
const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const queryClient = useQueryClient();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  //mutation logic for login
  const { mutate, isPending } = useMutation({
    mutationFn: loginHandler,
    onSuccess: (data) => {
      alert(data.message);
      queryClient.invalidateQueries(["isLogin"]);
    },
    onError: (error) => {
      alert(error.message);
    },
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    mutate(loginData);
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

        <button type="submit">{isPending ? "Loding..." : "Log In"}</button>
      </form>
    </div>
  );
};

export default Login;
