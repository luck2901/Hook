import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

const useNotification = (title, options) => {
    if (!("Notification" in window)) {
      return;
    }
    const fireNotif = () => {
      if (Notification.permission !== "granted") {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            new Notification(title, options);
          } else {
            return;
          }
        });
      } else {
        new Notification(title, options);
      }
    };
    return fireNotif;
  };
  
  const App = () => {
    const triggerNotif = useNotification("Can I steal your kimchi?");
    return (
      <div className="App" style={{ height: "1000vh" }}>
        <button onclick={triggerNotif}>Hello</button>
      </div>
    );
  };