import React, { useRef, useState, useEffect } from "react";

const Timer = () => {
  const initialPomodoro = 25;
  let selectedTime = 0;
  let countDown = null;
  let time = initialPomodoro;
  let timerEl = useRef(null);
  const startButton = useRef(null);
  const stopButton = useRef(null);

  useEffect(() => {
    timerEl.current.textContent = initialPomodoro;
    startButton.current.style.display = "block";
    stopButton.current.style.display = "none";
  }, []);

  const runTimer = () => {
    if (time > 0) {
      time--;
    } else {
      stopTimer();
    }
    timerEl.current.textContent = time;
  };

  const startTimer = () => {
    startButton.current.style.display = "none";
    stopButton.current.style.display = "block";
    countDown = setInterval(() => runTimer(), 1000);
  };

  const stopTimer = () => {
    clearInterval(countDown);
    startButton.current.style.display = "block";
    stopButton.current.style.display = "none";
  };

  const resetTimer = () => {
    if (selectedTime === 0) {
      time = initialPomodoro;
    } else {
      time = selectedTime;
    }
    timerEl.current.textContent = time;
  };

  const dropDown = (start, end, interval) => {
    const content = [];
    for (let i = start; i <= end; i += interval) {
      content.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return content;
  };

  const handleOnChange = (e) => {
    timerEl.current.textContent = e.target.value;
    time = e.target.value;
    selectedTime = e.target.value;
  };

  return (
    <div>
      This is timer
      <div ref={timerEl}></div>
      <button ref={startButton} onClick={startTimer}>
        Start
      </button>
      <button ref={stopButton} onClick={stopTimer}>
        Stop
      </button>
      <button onClick={resetTimer}>Reset</button>
      <div>
        Pomodoro length : Minutes
        <select
          name="pomodoro-length"
          onChange={handleOnChange}
          defaultValue={initialPomodoro}
        >
          {dropDown(1, 60, 1)}
        </select>
      </div>
    </div>
  );
};

export default Timer;
