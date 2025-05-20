import React from "react";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="logo">Tamasha</div>
      <div className="nav">
        <div>Home</div>
        <div>Live TV</div>
        <div>Shots</div>
        <div>More</div>
      </div>
    </div>
  );
} 