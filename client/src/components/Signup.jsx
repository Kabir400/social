import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import "../css/signup.css";

// Signup handler (Mutation function)
const signupHandler = async (formData) => {
  const response = await fetch("http://localhost:4040/api/v1/signup", {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  let data;
  try {
    data = await response.json();
  } catch (error) {
    throw new Error("something went wrong");
  }

  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
};

const Signup = ({ setAccessOtp }) => {
  const navigate = useNavigate();

  const [Data, setData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...Data,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setData({
      ...Data,
      avatar: e.target.files[0],
    });
  };

  // Corrected Mutation hook
  const { mutate, isPending, isSuccess, isError, error, data, reset } =
    useMutation({
      mutationFn: signupHandler,
    });

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("avatar", Data.avatar);
    formData.append("name", Data.name);
    formData.append("email", Data.email);
    formData.append("password", Data.password);

    // Trigger the mutation
    mutate(formData);
  };

  if (isError) {
    alert(error.message);
    reset(); //reset the state to avoid duplicate error
  }

  if (isSuccess && data) {
    alert(data.message);
    setAccessOtp(true);
    navigate("/otp");
    reset();
  }

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            value={Data.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={Data.email}
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
            value={Data.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="avatar">Avatar</label>
          <input
            type="file"
            id="avatar"
            name="avatar"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        <button type="submit">{isPending ? "Loading..." : "Sign Up"}</button>
      </form>
    </div>
  );
};

export default Signup;
