import React, { useState } from "react";
import "../css/Otp.css"; // Ensure you import the CSS file

const Otp = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (otp === "123456") {
      setSuccess("OTP verified successfully!");
      setError("");
    } else {
      setError("Invalid OTP, please try again.");
      setSuccess("");
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
        <button type="submit">Verify</button>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
      </form>
    </div>
  );
};

export default Otp;
