import React, { useRef, useState } from "react";
import { FaCopy, FaCheck } from "react-icons/fa";
import axios from "axios";

import "../styles/MainContent.css";

export default function MainContent() {
  const urlInputRef = useRef();
  const shortenedUrlRef = useRef();

  const [buttonText, setButtonText] = useState("Shorten It");
  const [currentButtonClass, setButtonClass] = useState("");
  const [currentLink, setLink] = useState("");
  const [currentClass, setClass] = useState("");
  const [currentIcon, setIcon] = useState(false);

  function handleLinkSubmit() {
    const userInputURL = urlInputRef.current.value;

    if (userInputURL == "") return;

    axios
      .post("/short", { userInput: userInputURL })
      .then((res) => {
        setLink(res.data.shortURL);
        setButtonText("Shortened");
        setButtonClass("Shortened");
        setTimeout(() => {
          setButtonText("Shorten It");
          setButtonClass("");
        }, 2000);
      })
      .catch((err) => {
        setButtonText("Error");
        setButtonClass("Error");
        setTimeout(() => {
          setButtonText("Shorten It");
          setButtonClass("");
        }, 2000);
        console.log(err);
      });
  }

  function handleLinkCopy() {
    navigator.clipboard.writeText(shortenedUrlRef.current.value);
    setClass("Copied");
    setIcon(true);
    setTimeout(() => {
      setClass("");
      setIcon(false);
    }, 2000);
  }

  return (
    <div id="MainContent">
      <div id="UserInput">
        <input
          type="Text"
          id="shortenedURLHolder"
          placeholder="Shortened Link"
          readOnly
          ref={shortenedUrlRef}
          value={currentLink}></input>
        <input
          type="Text"
          id="UserURLInput"
          placeholder="Enter your link here"
          ref={urlInputRef}></input>
        <div id="UserControls">
          <button
            id="StartShortButton"
            className={currentButtonClass}
            onClick={handleLinkSubmit}>
            {buttonText}
          </button>
          <button
            id="CopyLinkContainer"
            className={currentClass}
            onClick={handleLinkCopy}>
            {currentIcon ? (
              <FaCheck className="ButtonIcon" />
            ) : (
              <FaCopy className="ButtonIcon" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
