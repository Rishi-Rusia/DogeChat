import React from "react";
import "./main.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const OnSubmit = async (e) => {
    e.preventDefault();

    const authEmail = e.target.elements.email.value;
    const authPassword = e.target.elements.password.value;
    const authImage = e.target.elements.profilepic.files[0];
    const authUserName = e.target.elements.username.value;

    console.log(authImage);

    const storageRef = ref(storage, `images/${authUserName}.jpg`);
    const uploadTask = uploadBytesResumable(storageRef, authImage);
    console.log(authEmail);
    let res;
    createUserWithEmailAndPassword(auth, authEmail, authPassword)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        res = user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        console.log(error);
      });

    // let changeRequest = auth.auth().currentUser?.createProfileChangeRequest();
    // changeRequest.displayName = authUserName;
    // changeRequest.photoURL = authImage;

    uploadTask.on(
      "state_changed",
      async (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        console.log(error);
      },
      async () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log("File available at", downloadURL);

          try {
            await setDoc(doc(db, "users", `${res.uid}`), {
              name: "Los Angeles",
              email: `${authEmail}`,
              username: `${authUserName}`,
              image: downloadURL,
              uid: `${res.uid}`,
            });

            await setDoc(doc(db, "userchats", `${res.uid}`), {});
            navigate("/");
          } catch (error) {
            console.log(error);
          }
        });
      }
    );
  };

  return (
    <div className="register-body">
      <div className="register-container">
        <form className="register-form" onSubmit={OnSubmit}>
          <h2 className="logo">DogeChat</h2>
          <span className="register-span">register</span>
          <input
            type="text"
            placeholder="display name"
            className="register-input"
            name="username"
          />
          <input
            type="email"
            className="register-input"
            placeholder="email"
            name="email"
          />
          <input
            type="password"
            className="register-input"
            placeholder="password"
            name="password"
          />
          <input type="file" id="image" name="profilepic" />
          <label htmlFor="image" id="pfp">
            <i className="fa-solid fa-image fa-2x"></i>
          </label>

          <button className="register-button" type="submit">
            Sign up
          </button>
          <p>
            Already have an account?{" "}
            <Link to="/login">
              <u>Login</u>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
