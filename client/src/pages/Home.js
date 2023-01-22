import React from "react";
import "./home.css";
import Sidebar from "../components/Sidebar";
import Chats from "../components/Chats";

export default function Home() {
  return (
    <div className="home">
      <div className="home-container">
        <Sidebar></Sidebar>
        <Chats></Chats>
      </div>
    </div>
  );
}
