// import React from "react";

// export default function Input() {
//   return (
//     <div className="sendbox">
//       <input type="text" />

//       <img
//         className="clipButton"
//         src="https://cdn-icons-png.flaticon.com/512/74/74741.png"
//         alt=""
//       />
//       <img
//         className="sendButton"
//         src="https://static.thenounproject.com/png/3553333-200.png"
//         alt=""
//       />
//     </div>
//   );
// }

import React, { useContext, useState } from "react";
// import Img from "../img/img.png";
// import Attach from "../img/attach.png";
import { AuthContext } from "../context/Authcontext";
import { ChatContext } from "../context/ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          //TODO:Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await setText("");
    setImg(null);
  };

  const keyWasPressed = (e) => {
    if (e.code === "Enter") {
      setText("");
      handleSend();
    }
  };

  const buttonWasPressed = (e) => {
    setText("");
    handleSend();
  };
  return (
    <div className="sendbox">
      <input
        type="text"
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
        onKeyDown={keyWasPressed}
      />
      <div className="send">
        {/* <img src={Attach} alt="" /> */}
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
          className="clipButton"
        />
        <label htmlFor="file">{/* <img src={Img} alt="" /> */}</label>
        <button onClick={buttonWasPressed} className="sendButton">
          Send
        </button>
      </div>
    </div>
  );
};

export default Input;
