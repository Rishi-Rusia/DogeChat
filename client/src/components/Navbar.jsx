import React, { useContext } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/Authcontext";
import { useState } from "react";
import { useEffect } from "react";

export default function Navbar() {
  const { currentUser } = useContext(AuthContext);
  const [userName, setuserName] = useState("");
  const [photo, setphoto] = useState("");

  useEffect(() => {
    const loader = async () => {
      const docRef = doc(db, "users", `${currentUser.uid}`);
      const docSnap = await getDoc(docRef);

      console.log(docSnap);
      console.log("This is docsnap data:::" + docSnap.data());

      if (docSnap.exists()) {
        setuserName(
          docSnap._document.data.value.mapValue.fields.username.stringValue
        );
        setphoto(
          docSnap._document.data.value.mapValue.fields.image.stringValue
        );
      }
    };

    loader();
  }, [currentUser.uid]);

  return (
    <div className="navbar">
      <span id="username">{userName}</span>
      <img src={photo} alt="" id="default-profile" />
    </div>
  );
}
