import React from "react";
import "./main.css";

export default function Login() {
  return (
    <div>
      {" "}
      <div className="register-body">
        <div className="register-container">
          <form action="" className="register-form">
            <h2 className="logo">DogeChat</h2>
            <span className="register-span">login</span>

            <input
              type="email"
              className="register-input"
              placeholder="email"
            />
            <input
              type="password"
              className="register-input"
              placeholder="password"
            />

            <button className="register-button" type="submit">
              Log in
            </button>
            <p>
              New to dogechat? <u>Register here</u>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
