import React, { useState } from "react";
import "../css/Otp.css"; // Ensure you import the CSS file

import { useNavigate } from "react-router-dom";
const Otp = ({ setAccessOtp, setLogin }) => {
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loding, setLoding] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoding(true);

    try {
      const res = await fetch("http://localhost:4040/api/v1/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp }),
        credentials: "include",
      });

      const data = await res.json();

      if (data.success) {
        setSuccess("OTP verified successfully!");
        setError("");
        setAccessOtp(false);
        setLogin(true);
        setLoding(false);
        navigate("/");
      } else {
        setLoding(false);
        setError(data.message);
        setSuccess("");
      }
    } catch (err) {
      setError(err.message);
      setSuccess("");
      setLoding(false);
    }
  };

  return (
    <div className="verify-otp-page">
      <h2>Verify OTP</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="otp">Enter OTP:</label>
          <input
            type="text"
            id="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </div>
        <button type="submit">{loding ? "Loading..." : "Verify"}</button>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
      </form>
    </div>
  );
};

export default Otp;
