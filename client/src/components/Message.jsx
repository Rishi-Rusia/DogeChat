// import React from "react";

// export default function Message() {
//   return <div className="sentMessage">Message</div>;
// }

import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/Authcontext";
// import { ChatContext } from "../context/ChatContext";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  // const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  }, [message]);

  return (
    <div
      ref={ref}
      className={`${message.senderId === currentUser.uid && "owner"}`}
    >
      <div className="messageInfo">
        {/* <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        /> */}
      </div>
      <div
        className={`${
          message.senderId === currentUser.uid
            ? "sentMessage"
            : "receivedMessage"
        }`}
      >
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;
