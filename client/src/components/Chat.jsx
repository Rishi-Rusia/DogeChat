import "../pages/home.css";
import React from "react";
import Search from "./Search";
import { useState } from "react";
import { useEffect } from "react";
import { AuthContext } from "../context/Authcontext";
import { useContext } from "react";
import { onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { doc } from "firebase/firestore";
import { ChatContext } from "../context/ChatContext";

export default function Chat() {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userchats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid, chats]);

  const handleSelect = (u) => {
    if (chats && u) {
      dispatch({ type: "CHANGE_USER", payload: u });
    }
  };

  console.log();

  // <div className="contact-chat">
  //   <img
  //     src="https://preview.redd.it/qa2ekrsinj241.jpg?auto=webp&s=22a9e974a38b81a4e01c720a85e364540930557a"
  //     alt=""
  //     className="contact-profile"
  //   />
  //   <div className="contact-name-message">
  //     <span className="contact-name">
  //       <b>Kaladin</b>
  //     </span>
  //     <p className="contact-last-message">I miss teft</p>
  //   </div>
  // </div>;

  return (
    <div className="chat">
      <Search></Search>
      <div className="chat-contacts-section">
        {chats &&
          Object.entries(chats).map((chats) => {
            return (
              <div
                className="contact-chat"
                key={chats}
                onClick={() => handleSelect(chats[1].userInfo)}
              >
                <img
                  src={chats[1].userInfo.image}
                  alt=""
                  className="contact-profile"
                />
                <div className="contact-name-message">
                  <span className="contact-name">
                    <b>{chats[1].userInfo.username}</b>
                  </span>
                  <p className="contact-last-message">
                    {chats[1].lastMessage?.text}
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
