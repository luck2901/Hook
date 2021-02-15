import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

const useFullscreen = (callback) => {
    const element = useRef();
    const runCb = (isFull) => {
      if (callback && typeof callback === "function") {
        callback(isFull);
      }
    };
    const triggerFull = () => {
      if (element.current) {
        if (element.current.requestFullscreen) {
          element.current.requestFullscreen();
        } else if (element.current.mozRequestFullScreen) {
          element.current.mozRequestFullScreen();
        } else if (element.current.webkitRequestFullscreen) {
          element.current.webkitRequestFullscreen();
        } else if (element.current.msRequestFullscreen) {
          element.current.msRequestFullscreen();
        }
        runCb(true);
      }
    };
    const exitFull = () => {
      document.exitFullscreen();
      if (callback && typeof callback === "function") {
        callback(false);
      }
    };
    return { element, triggerFull, exitFull };
  };
  const App = () => {
    const onFullS = (isFull) => {
      console.log(isFull ? "We are full" : "We are small");
    };
    const { element, triggerFull, exitFull } = useFullscreen();
    return (
      <div className="App" style={{ height: "1000vh" }}>
        <div>
          <img
            ref={element}
            src="https://t1.daumcdn.net/cfile/blog/2455914A56ADB1E315"
          />
          <button onClick={exitFull}> Exit fullscreen</button>
        </div>
        <button onClick={triggerFull}> Make fullscreen</button>
      </div>
    );
  };