import React, { useRef, useState, useEffect } from "react";

const Timer = () => {
  const initialNum = 10;
  let countDown = null;
  let time = initialNum;
  const timer = useRef();

  useEffect(() => {
    timer.current.textContent = time;
  }, []);

  const runTimer = () => {
    if (time > 0) {
      time--;
    } else {
      clearInterval(countDown);
    }
    timer.current.textContent = time;
  };

  const startTimer = () => {
    countDown = setInterval(() => runTimer(), 1000);
  };

  const stopTimer = () => {
    clearInterval(countDown);
  };

  const resetTimer = () => {
    time = initialNum;
    timer.current.textContent = time;
  };

  const convertTime = (sec) => {
    if (sec < 60) {
      return sec + "sec";
    }
    return Math.floor(sec / 60) + "min" + (sec % 60) + "sec";
  };

  return (
    <div>
      This is timer
      <div ref={timer}></div>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
};

export default Timer;
