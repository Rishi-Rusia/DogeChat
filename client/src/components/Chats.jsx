import "../pages/home.css";
import React from "react";
import Messages from "./Messages";
import Input from "./Input";

export default function Chats() {
  return (
    <div className="chats">
      {/* //THE TOP BAR OF CHATS */}
      <div className="topbar">
        <div className="topbar-contact-name">
          <b>JESSICA</b>
        </div>
      </div>
      {/* // MESSAGES */}
      <Messages></Messages>

      <Input></Input>
    </div>
  );
}
