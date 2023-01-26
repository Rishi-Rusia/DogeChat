import React, { useContext } from "react";
import { useState } from "react";
import { ChatContext } from "../context/ChatContext";
import Message from "./Message";
import { useEffect } from "react";
import { onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { doc } from "firebase/firestore";

export default function Messages() {
  const { data } = useContext(ChatContext);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unsub();
    };
  }, [data.chatId]);

  return (
    <div className="messages-component">
      {messages.map((m) => {
        return <Message message={m} key={m.id}></Message>;
      })}
    </div>
  );
}
