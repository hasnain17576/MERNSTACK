import React from "react";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Sidebar />
      <Home />
    </div>
  );
}

export default App; 