import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import Join from "./components/Join/Join";
import Chat from "./components/Chat/Chat";

function App() {
  return (
    <Routes>
      <Route path="/chat" element={<Chat />} />
      <Route path="/" exact element={<Join />} />
    </Routes>
  );
}

export default App;
