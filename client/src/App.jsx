import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";

function App() {
  return (
    <>
      <Router>
        <Nav></Nav>
        <Routes>
          <Route path="/" element={<>hello</>}></Route>
          <Route path="/creator" element={<>hello</>}></Route>
          <Route path="/login" element={<>hello</>}></Route>
          <Route path="/signup" element={<>hello</>}></Route>
          <Route path="/myAccout" element={<>hello</>}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
