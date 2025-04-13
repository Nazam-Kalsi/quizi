import "./App.css";
import { Routes, Route } from "react-router";
import Users from "./pages/Users";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import { io } from "socket.io-client";

function App() {
  const socket = io("http://localhost:3000");


  return (
    <Routes>
      <Route index element={<Home/>} />
      <Route path="user" element={<Users socket={socket}/>} />
      <Route path="admin" element={<Admin socket={socket}/>} />
    </Routes>
  );
}

export default App;
