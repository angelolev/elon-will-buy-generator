import React, { useState, useRef, useCallback } from "react";
import elonProfile from "./elon-profile.jpeg";
import { toPng } from "html-to-image";
import "./App.css";

function App() {
  const [currentText, setCurrentText] = useState("");
  const ref = useRef(null);

  const handleChange = (e) => {
    setCurrentText(e.target.value);
  };

  const generateTweet = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    toPng(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "my-image-name.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ref]);

  return (
    <div className="App">
      <div className="container">
        <h1>Elon will buy generator</h1>
        <div className="tweet" ref={ref}>
          <div className="tweet__profile">
            <div className="tweet__image">
              <img src={elonProfile} className="" alt="logo" />
            </div>
            <div className="tweet__name">
              <h3>Elon Musk</h3>
              <h5>@elonmusk</h5>
            </div>
          </div>
          <div className="tweet__content">
            <p className="tweet__text">Now I'm going to buy {currentText}</p>
          </div>
        </div>

        <p className="guess">
          Guess which will be next product Elon Musk buy ...
        </p>

        <input
          className="tweet__input"
          maxLength={140}
          type="text"
          onChange={(e) => handleChange(e)}
          placeholder="Guess ..."
        />

        <button className="tweet__button" onClick={() => generateTweet()}>
          Generate!
        </button>
      </div>
      <footer>
        <p>
          Made by{" "}
          <a
            href="https://linktr.ee/angelolev"
            target="_blank"
            rel="noreferrer"
          >
            Angelo
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
