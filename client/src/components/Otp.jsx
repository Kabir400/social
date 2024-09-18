import React, { useState } from "react";
import "../css/Otp.css"; // Ensure you import the CSS file

import { useMutation, useQueryClient } from "@tanstack/react-query";

//verify otp
const otpHandler = async (otp) => {
  const response = await fetch("http://localhost:4040/api/v1/verify-otp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ otp }),
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

const Otp = ({ setAccessOtp }) => {
  const [otp, setOtp] = useState("");
  const queryClient = useQueryClient();

  //mulataing logic
  const { mutate, isPending, isSuccess, isError, error, data, reset } =
    useMutation({
      mutationFn: otpHandler,
    });

  //sumbmit hander for otp verification
  const handleSubmit = async (e) => {
    e.preventDefault();
    mutate(otp);
  };

  if (isSuccess) {
    alert(data.message);
    queryClient.invalidateQueries(["isLogin"]);
    setAccessOtp(false);
    reset();
  }

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
        <button type="submit">{isPending ? "Loading..." : "Verify"}</button>
        {isError && <p className="error">{error.message}</p>}
        {isSuccess && <p className="success">Otp verified successfully</p>}
      </form>
    </div>
  );
};

export default Otp;
