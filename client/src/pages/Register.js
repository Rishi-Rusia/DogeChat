import React from "react";
import "./main.css";

export default function Register() {
  return (
    <div className="register-body">
      <div className="register-container">
        <form action="" className="register-form">
          <h2 className="logo">DogeChat</h2>
          <span className="register-span">register</span>
          <input
            type="text"
            placeholder="display name"
            className="register-input"
          />
          <input type="email" className="register-input" placeholder="email" />
          <input
            type="password"
            className="register-input"
            placeholder="password"
          />
          <input type="file" id="image" />
          <label htmlFor="image" id="pfp">
            <i class="fa-solid fa-image fa-2x"></i>
          </label>

          <button className="register-button" type="submit">
            Sign up
          </button>
          <p>
            Already have an account? <u>Login</u>{" "}
          </p>
        </form>
      </div>
    </div>
  );
}
