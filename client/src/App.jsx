import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import "./css/404.css";

import Nav from "./components/Nav.jsx";
import Card from "./components/Card.jsx";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import MyAccount from "./components/MyAccount.jsx";
import PostView from "./components/ViewPost.jsx";
import Reply from "./components/Reply.jsx";
import Otp from "./components/Otp.jsx";

import { useState, useEffect } from "react";

//...............................................................
function App() {
  //states
  const [accessOtp, setAccessOtp] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  return (
    <Router>
      {/* Use useNavigate inside the Router context */}
      <AppRoutes
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        accessOtp={accessOtp}
        setAccessOtp={setAccessOtp}
      />
    </Router>
  );
}
//...........................................................

//isLogin handler

const isLoginHandler = async () => {
  const res = await fetch("http://localhost:4040/api/v1/islogin", {
    method: "GET",
    credentials: "include",
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }

  return data.data;
};

//..............................................................
//seperate comonent for for useNavigate logic
function AppRoutes({ isLogin, setIsLogin, accessOtp, setAccessOtp }) {
  const navigate = useNavigate();

  const { isError, error, isSuccess } = useQuery({
    queryKey: ["isLogin"],
    queryFn: isLoginHandler,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    retry: false,
  });

  useEffect(() => {
    if (isSuccess) {
      setIsLogin(true);
      navigate("/");
    } else if (isError) {
      setIsLogin(false);
      navigate("/login");
    }
  }, [isSuccess, isError, error, isLogin]);

  return (
    <>
      <Nav isLogin={isLogin} />
      <Routes>
        {!isLogin ? (
          <>
            <Route path="/login" element={<Login />} />
            <Route
              path="/signup"
              element={<Signup setAccessOtp={setAccessOtp} />}
            />
          </>
        ) : (
          <>
            <Route path="/" element={<Card />} />
            <Route path="/creator" element={<>hello</>} />
            <Route path="/myaccount" element={<MyAccount />} />
            <Route path="/post/view" element={<PostView />} />
            <Route path="/reply" element={<Reply />} />
          </>
        )}
        {accessOtp && (
          <Route path="/otp" element={<Otp setAccessOtp={setAccessOtp} />} />
        )}
        <Route
          path="*"
          element={<div className="not-found">404 Page Not Found</div>}
        />
      </Routes>
    </>
  );
}
//................................................................
export default App;
