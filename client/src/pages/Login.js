import React from "react";
import "./main.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const OnSubmit = async (e) => {
    e.preventDefault();

    // console.log("form was submitted");

    // console.log(e);

    const authEmail = e.target.elements.email.value;
    const authPassword = e.target.elements.password.value;

    // console.log(authEmail, authPassword);

    signInWithEmailAndPassword(auth, authEmail, authPassword)
      .then(async (userCredential) => {
        // Signed in
        const user = await userCredential.user;
        console.log("Login Component " + user);

        // return <Navigate to="/"></Navigate>;

        navigate("/");

        // ...
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="register-body">
        <div className="register-container">
          <form action="" className="register-form" onSubmit={OnSubmit}>
            <h2 className="logo">DogeChat</h2>
            <span className="register-span">login</span>

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

            <button className="register-button" type="submit" name="submit">
              Log in
            </button>
            <p>
              New to dogechat?{" "}
              <u>
                <Link to="/register">Register here</Link>
              </u>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
