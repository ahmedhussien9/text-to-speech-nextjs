import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import "font-awesome/css/font-awesome.min.css";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import RangeSlider from "react-bootstrap-range-slider";

function Homepage() {
  const STEP = 0.1;
  const MIN = 0;
  const MAX_VOLUME = 1;
  const MAX_PITCH = 2;
  const MAX_RATE = 10;

  const [message, setMessage] = useState("");
  const [voices, setVoices] = useState([]);
  const [voiceCode, setVoiceCode] = useState("en-US");
  const [volume, setVolume] = useState(0.5);
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [isSpeaking, setSpeaking] = useState(false);
  const [supported, setSupported] = useState(false);

  const getVoices = () => {
    let voiceOptions = window.speechSynthesis.getVoices();
    if (voiceOptions.length > 0) {
      processVoices(voiceOptions);
      return;
    }

    window.speechSynthesis.onvoiceschanged = (event) => {
      voiceOptions = event.target.getVoices();
      processVoices(voiceOptions);
    };
  };

  const processVoices = (voiceOptions) => {
    setVoices(voiceOptions);
  };

  const resumeSpeaking = () => {
    window.speechSynthesis.resume();
  };

  const pauseSpeaking = () => {
    window.speechSynthesis.pause();
  };

  useEffect(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      setSupported(true);
      getVoices();
    }
  }, []);

  const sendMessage = (message) => {
    setMessage(message);
  };

  const onChangeVoice = (voice) => {
    setVoiceCode(voice);
  };

  const speak = () => {
    const speech = new SpeechSynthesisUtterance();
    // Handle pause speaking
    if (!supported) return;
    if (isSpeaking && !isPaused) {
      pauseSpeaking();
      setIsPaused(true);
      return;
    }
    // Handle resume speaking again
    if (isSpeaking && isPaused) {
      resumeSpeaking();
      setIsPaused(false);
      return;
    }
    // Speaking for first time
    speech.lang = voiceCode;
    speech.text = message;
    speech.volume = volume;
    speech.rate = rate;
    speech.pitch = pitch;
    speech.onstart = () => {
      setSpeaking(true);
    };
    speech.onend = () => {
      setSpeaking(false);
    };
    window.speechSynthesis.speak(speech);
  };

  const changePlayAndPauseIcon = () => {
    if (isPaused) {
      return <i className="fa fa-play" aria-hidden="true"></i>;
    }

    if (isSpeaking) {
      return (
        <div>
          <i className="fa fa-pause" aria-hidden="true"></i>
          <div className="pulseRing"></div>
        </div>
      );
    }

    return <i className="fa fa-play" aria-hidden="true"></i>;
  };

  return (
    <Layout
      title="Text To Speech | Home"
      description="The Web Speech API provides two distinct areas of functionality —
    speech recognition, and speech synthesis (also known as text to
    speech, or tts)"
    >
      <div className="container">
        <h1 className="title">
          Text to Speech using{" "}
          <span className="highlightText">Web Speech API</span> in JavaScript{" "}
          <i className="fa fa-microphone"></i>
        </h1>
        <p className="description">
          The Web Speech API provides two distinct areas of functionality —
          speech recognition, and speech synthesis (also known as text to
          speech, or tts) — which open up interesting new possibilities for
          accessibility, and control mechanisms.
        </p>
        <a
          className="link"
          href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API"
          target="_blank"
        >
          Read More
        </a>
        {/* Voice Animation bar*/}
        <div className="barArea">
          {isPaused ? (
            <div className="stoppedArea">
              <h6 className="stoppedAreaTitle">Stopped</h6>
            </div>
          ) : (
            ""
          )}
          {isSpeaking && !isPaused ? (
            <div className="barContainer">
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="voiceControlsContainer">
          <div className="voiceVolumeContainer">
            <h6 className="controlLabel">Volume</h6>
            <RangeSlider
              min={MIN}
              max={MAX_VOLUME}
              value={volume}
              step={STEP}
              variant="primary"
              onChange={(changeEvent) => setVolume(changeEvent.target.value)}
            />
          </div>
          <div className="voiceVolumeContainer">
            <h6 className="controlLabel">Pitch</h6>
            <RangeSlider
              min={MIN}
              max={MAX_PITCH}
              value={pitch}
              step={STEP}
              variant="primary"
              onChange={(changeEvent) => setPitch(changeEvent.target.value)}
            />
          </div>
          <div className="voiceVolumeContainer">
            <h6 className="controlLabel">Rate</h6>
            <RangeSlider
              min={1}
              max={MAX_RATE}
              value={rate}
              step={STEP}
              variant="primary"
              onChange={(changeEvent) => setRate(changeEvent.target.value)}
            />
          </div>
        </div>
        <div className="speechContainer">
          {voices && voices.length ? (
            <div className="languageContainer">
              <h6 className="controlLabel">Select Language</h6>
              <select
                className="select"
                onChange={(event) => onChangeVoice(event.target.value)}
              >
                {voices &&
                  voices.length > 0 &&
                  voices.map((voice, key) => {
                    return (
                      <option key={key} value={voice.lang}>
                        {voice.name}
                      </option>
                    );
                  })}
              </select>
            </div>
          ) : (
            ""
          )}

          <textarea
            className="textArea"
            name="message"
            rows="8"
            placeholder="Please write something here and click on play button.."
            column="5"
            onChange={(event) => sendMessage(event.target.value)}
          ></textarea>

          <div className="playButtonContainer">
            <button onClick={speak} className="speechButton">
              {changePlayAndPauseIcon()}
            </button>
          </div>
        </div>
        {/* End Voice List & text */}
      </div>

      <style jsx global>{`
        .container {
          min-height: 100vh;
          padding: 3rem 1rem;
          position: relative;
          border: 1px solid #f1f1f1;
        }
        .title {
          color: #fff;
          font-size: 35px;
        }
        .description {
          color: #fff;
        }
        .controlLabel {
          font-size: 18px;
          color: #fff;
        }
        .link {
          font-weight: bold;
          color: #007bff;
        }
        .highlightText {
          color: #ff3d7f;
        }
        .stoppedArea {
          height: 70px;
          align-items: center;
          justify-content: center;
          display: flex;
        }
        .stoppedAreaTitle {
          display: inline-block;
          border: 1px solid #ff3d7f;
          color: #fff;
          font-size: 12px;
          padding: 0.3rem 1.5rem;
          border-radius: 5px;
        }
        .speechContainer {
          display: flex;
          flex-direction: column;
          width: 100%;
        }
        .languageContainer {
          margin-top: 1.5rem;
        }
        .label {
          color: #fff;
        }
        .select,
        .textArea {
          display: block;
          width: 100%;
          text-indent: 1rem;
          font-size: 1rem;
          line-height: 1.5;
          color: #495057;
          background-color: #fff;
          background-clip: padding-box;
          border: 1px solid #ced4da;
          border-radius: 0.25rem;
          transition: border-color 0.15s ease-in-out,
            box-shadow 0.15s ease-in-out;
        }

        select {
          height: 40px;
        }
        textarea,
        select {
          width: 100%;
          margin: 1rem 0rem;
        }

        textarea,
        select:focus {
          outline: none;
          box-shadow: none;
        }

        /*************************/
        /* Start Voice Bar Style */
        /*************************/

        .barContainer {
          display: flex;
          justify-content: center;
          align-items: center;
          transition: all 0.5s ease-in-out;
          /*     background: black; */
        }
        .barArea {
          /* min-height: 100px; */
          display: block;
          position: relative;
          height: 70px;
        }
        .bar {
          background: #ff3d7f;
          bottom: 1px;
          height: 2px;
          width: 5px;
          margin: 0px 4px;
          border-radius: 5px;
          animation: sound 0ms -600ms linear infinite alternate;
        }

        @keyframes sound {
          0% {
            opacity: 0.35;
            height: 3px;
          }
          100% {
            opacity: 1;
            height: 60px;
          }
        }

        .bar:nth-child(1) {
          left: 1px;
          animation-duration: 474ms;
        }
        .bar:nth-child(2) {
          left: 15px;
          animation-duration: 433ms;
        }
        .bar:nth-child(3) {
          left: 29px;
          animation-duration: 407ms;
        }
        .bar:nth-child(4) {
          left: 43px;
          animation-duration: 458ms;
        }
        .bar:nth-child(5) {
          left: 57px;
          animation-duration: 400ms;
        }
        .bar:nth-child(6) {
          left: 71px;
          animation-duration: 427ms;
        }
        .bar:nth-child(7) {
          left: 85px;
          animation-duration: 441ms;
        }
        .bar:nth-child(8) {
          left: 99px;
          animation-duration: 419ms;
        }
        .bar:nth-child(9) {
          left: 113px;
          animation-duration: 487ms;
        }
        .bar:nth-child(10) {
          left: 127px;
          animation-duration: 442ms;
        }
        .bar:nth-child(11) {
          left: 141px;
          animation-duration: 487ms;
        }
        .bar:nth-child(12) {
          left: 155px;
          animation-duration: 532ms;
        }
        /*************************/
        /* End Voice Bar Style */
        /*************************/

        .playButtonContainer {
          display: flex;
          justify-content: center;
        }
        .speechButton {
          border: none;
          padding: 0;
          border-radius: 100%;
          width: 70px;
          height: 70px;
          font-size: 2em;
          color: #fff;
          padding: 0;
          margin: 0;
          background: #ff3d7f;
          position: relative;
          display: inline-block;
          line-height: 50px;
          text-align: center;
          white-space: nowrap;
          vertical-align: middle;
          -ms-touch-action: manipulation;
          touch-action: manipulation;
          cursor: pointer;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          background-image: none;
        }

        .pulseRing {
          content: "";
          width: 70px;
          height: 70px;
          border: 5px solid #ff3d7f;
          border-radius: 50%;
          position: absolute;
          top: -5px;
          left: -5px;
          animation: pulsate infinite 2s;
        }

        @-webkit-keyframes pulsate {
          0% {
            -webkit-transform: scale(1, 1);
            opacity: 1;
          }
          100% {
            -webkit-transform: scale(1.2, 1.2);
            opacity: 0;
          }
        }

        .voiceControlsContainer {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .voiceVolumeContainer {
        }
      `}</style>
    </Layout>
  );
}

export default Homepage;
