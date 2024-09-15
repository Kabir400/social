import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../css/signup.css";

const Signup = ({ setAccessOtp }) => {
  const navigate = useNavigate();

  const [loding, setLoding] = useState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoding(true);

    const formData = new FormData();
    formData.append("avatar", Data.avatar);
    formData.append("name", Data.name);
    formData.append("email", Data.email);
    formData.append("password", Data.password);

    try {
      const response = await fetch("http://localhost:4040/api/v1/signup", {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      const data = await response.json();

      console.log("data in singup : ", data);
      if (data.success == false) {
        alert(data.message);
      } else {
        alert(data.message);
        setAccessOtp(true);
        setLoding(false);
        navigate("/otp");
      }
    } catch (error) {
      alert(error.message);
      setLoding(false);
      setAccessOtp(false);
    }
  };

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

        <button type="submit">{loding ? "Loading..." : "Sign Up"}</button>
      </form>
    </div>
  );
};

export default Signup;
