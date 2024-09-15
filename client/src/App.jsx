import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";

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

//seperate comonent for for useNavigate logic
function AppRoutes({ isLogin, setIsLogin, accessOtp, setAccessOtp }) {
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("http://localhost:4040/api/v1/islogin", {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        console.log(data);
        if (data.success) {
          setIsLogin(true);
        } else {
          setIsLogin(false);
          navigate("/login");
        }
      } catch (err) {
        alert(err.message);
      }
    })();
  }, [isLogin]);

  return (
    <>
      <Nav isLogin={isLogin} setIsLogin={setIsLogin} />
      <Routes>
        {!isLogin ? (
          <>
            <Route path="/login" element={<Login setIsLogin={setIsLogin} />} />
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
          <Route
            path="/otp"
            element={<Otp setLogin={setIsLogin} setAccessOtp={setAccessOtp} />}
          />
        )}
        <Route
          path="*"
          element={<div className="not-found">404 Page Not Found</div>}
        />
      </Routes>
    </>
  );
}

export default App;
