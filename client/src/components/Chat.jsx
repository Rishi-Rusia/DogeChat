import "../pages/home.css";
import React from "react";

export default function Chat() {
  return (
    <div className="chat">
      <div className="search-bar">
        <form action="">
          <input
            type="text"
            className="search-user"
            placeholder="Search contacts here"
          />
        </form>
      </div>

      <div className="contact-chat">
        <img
          src="https://avatarfiles.alphacoders.com/837/thumb-83705.png"
          alt=""
          className="contact-profile"
        />
        <div className="contact-name-message">
          <span className="contact-name">
            <b>Jessica</b>
          </span>
          <p className="contact-last-message">hey</p>
        </div>
      </div>

      <div className="contact-chat">
        <img
          src="https://w0.peakpx.com/wallpaper/315/933/HD-wallpaper-turn-that-frown-upside-down-anime-guy-black-hair-anime-messy-hair-sad-school-uniform-hyouka-green-eyes-evening-oreki-hountarou.jpg"
          alt=""
          className="contact-profile"
        />
        <div className="contact-name-message">
          <span className="contact-name">
            <b>Hoid</b>
          </span>
          <p className="contact-last-message">The king's wit</p>
        </div>
      </div>

      <div className="contact-chat">
        <img
          src="https://preview.redd.it/qa2ekrsinj241.jpg?auto=webp&s=22a9e974a38b81a4e01c720a85e364540930557a"
          alt=""
          className="contact-profile"
        />
        <div className="contact-name-message">
          <span className="contact-name">
            <b>Kaladin</b>
          </span>
          <p className="contact-last-message">I miss teft</p>
        </div>
      </div>
    </div>
  );
}
