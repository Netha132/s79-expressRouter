import "./App.css";
import Signup from "./components/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Projects from "./components/Projects";
import Reports from "./components/Reports";
import User from "./components/User";
import Main from "./components/Main";
import UpdateProfile from "./components/UpdateProfile";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/signup" element={<Signup/>}></Route>
          <Route path="/dashboard" element={<Dashboard/>}></Route>
          <Route path="/projects" element={<Projects/>}></Route>
          <Route path="/reports" element={<Reports/>}></Route>
          <Route path="/user" element={<User/>}></Route>
          <Route path="/updateprofile" element={<UpdateProfile/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
