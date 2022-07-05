import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Join from "./components/Join";
import Chat from "./components/Chat";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/chat" element={<Chat />} />
        <Route path="/" element={<Join />} />
      </Routes>
    </Router>
  );
}

export default App;
