import "./App.css";
import { Routes, Route } from "react-router";
import Users from "./pages/Users";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import { io, Socket } from "socket.io-client";
import { useEffect, useState } from "react";

function App() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const s: Socket = io("http://localhost:3000");
    if (s) {
      setSocket(s);
      setLoading(false);
    }
  }, []);

  return loading ? (
    <></>
  ) : (
    <Routes>
      <Route index element={<Home />} />
      <Route path="user" element={<Users socket={socket as Socket} />} />
      <Route path="admin" element={<Admin socket={socket as Socket} />} />
    </Routes>
  );
}

export default App;
