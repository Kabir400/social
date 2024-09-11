import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav.jsx";
import Card from "./components/Card.jsx";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import MyAccount from "./components/MyAccount.jsx";
import PostView from "./components/ViewPost.jsx";
import Reply from "./components/Reply.jsx";

function App() {
  return (
    <>
      <Router>
        <Nav></Nav>
        <Routes>
          <Route path="/" element={<Card />}></Route>
          <Route path="/creator" element={<>hello</>}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/myaccount" element={<MyAccount />}></Route>
          <Route path="/post/view" element={<PostView />}></Route>
          <Route path="/reply" element={<Reply />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
