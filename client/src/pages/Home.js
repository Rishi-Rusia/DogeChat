import React from "react";
import "./home.css";
import Sidebar from "../components/Sidebar";
import Chats from "../components/Chats";

export default function Home(props) {
  return (
    <div className="home">
      <div className="home-container">
        <Sidebar
          toggleSideBar={props.toggleSideBar}
          isOpen={props.isOpen}
          myFunction={props.myFunction}
        ></Sidebar>
        <Chats
          toggleSideBar={props.toggleSideBar}
          isOpen={props.isOpen}
          myFunction={props.myFunction}
        ></Chats>
      </div>
    </div>
  );
}
