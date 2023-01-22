import "../pages/home.css";
import React from "react";
import Navbar from "./Navbar";
import Chat from "./Chat";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <Navbar></Navbar>
      <Chat></Chat>
    </div>
  );
}
