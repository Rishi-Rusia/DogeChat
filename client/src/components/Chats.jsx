import "../pages/home.css";
import React, { useContext } from "react";
import Messages from "./Messages";
import Input from "./Input";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { ChatContext } from "../context/ChatContext";

export default function Chats(props) {
  const { data } = useContext(ChatContext);

  const toggleBox = () => {
    if (props.isOpen === false) {
      props.toggleSideBar(true);
    } else {
      props.toggleSideBar(false);
    }
    console.log(props.isOpen);
  };

  return (
    <div className="chats">
      {/* //THE TOP BAR OF CHATS */}
      <div className="topbar">
        <div className="topbar-contact-name">
          <b>{data.user?.username}</b>

          <div className="topbar-button-group">
            <button className="menu-button" onClick={toggleBox}>
              CHATS
            </button>

            <button onClick={() => signOut(auth)}>LOGOUT</button>
          </div>
        </div>
      </div>
      {/* // MESSAGES */}
      <Messages></Messages>

      <Input></Input>
    </div>
  );
}
