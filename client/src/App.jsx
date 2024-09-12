import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./css/404.css";

import Nav from "./components/Nav.jsx";
import Card from "./components/Card.jsx";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import MyAccount from "./components/MyAccount.jsx";
import PostView from "./components/ViewPost.jsx";
import Reply from "./components/Reply.jsx";
import Otp from "./components/Otp.jsx";

import { useState } from "react";

function App() {
  //states
  const [accessOtp, setAccessOtp] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  return (
    <>
      <Router>
        <Nav isLogin={isLogin}></Nav>
        <Routes>
          <Route path="/" element={<Card />}></Route>
          <Route path="/creator" element={<>hello</>}></Route>
          {!isLogin && (
            <>
              <Route
                path="/login"
                element={<Login />}
                setLogin={setIsLogin}
              ></Route>
              <Route
                path="/signup"
                element={<Signup />}
                setLogin={setIsLogin}
                setAccessOtp={setAccessOtp}
              ></Route>
            </>
          )}
          <Route path="/myaccount" element={<MyAccount />}></Route>
          <Route path="/post/view" element={<PostView />}></Route>
          <Route path="/reply" element={<Reply />}></Route>
          {accessOtp && <Route path="/otp" element={<Otp />}></Route>}
          <Route
            path="*"
            element={<div className="not-found">404 Page Not Found</div>}
          ></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
