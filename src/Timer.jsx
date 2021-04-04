import React, { useRef, useState, useEffect } from "react";

const initialPomodoro = 25;
const initialShortBreak = 5;
const initialLongBreak = 15;
let selectedMode;

const obj = {
  pomodoro: {
    initialMin: initialPomodoro,
    initialTime: initialPomodoro * 60,
    selectedTime: 0,
  },
  shortBreak: {
    initialMin: initialShortBreak,
    initialTime: initialShortBreak * 60,
    selectedTime: 0,
  },
  longBreak: {
    initialMin: initialLongBreak,
    initialTime: initialLongBreak * 60,
    selectedTime: 0,
  },
};

let time; // Calculate using value in time
let countDown = null;

const Timer = () => {
  const min = 0;
  const max = 60;

  let timerEl = useRef(null);
  const startButton = useRef(null);
  const stopButton = useRef(null);
  const pomodoroValue = useRef(null);
  const shortBreakValue = useRef(null);
  const longBreakValue = useRef(null);
  const [timerMessage, setEndMessage] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [isOpenSetting, setIsOpenSetting] = useState(false);

  const [mode, setMode] = useState("pomodoro"); // pomodoro, shortBreak, longBreak

  const convertTime = (time) => {
    let min;
    let sec;

    if (Math.floor(time / 60) < 10) {
      min = "0" + String(Math.floor(time / 60));
    } else {
      min = Math.floor(time / 60);
    }

    if (time % 60 < 10) {
      sec = "0" + String(time % 60);
    } else {
      sec = time % 60;
    }
    return min + ":" + sec;
  };

  useEffect(() => {
    if (mode === "pomodoro") {
      selectedMode = obj.pomodoro;
    }
    if (mode === "shortBreak") {
      selectedMode = obj.shortBreak;
    }
    if (mode === "longBreak") {
      selectedMode = obj.longBreak;
    }
    resetTimer();
    setIsRunning(false);
  }, [mode]);

  const runTimer = () => {
    if (time > 0) {
      time--;
    } else {
      stopTimer();
      if (mode === "pomodoro") {
        setEndMessage("Time for a break");
      }
      if (mode === "shortBreak" || mode === "longBreak") {
        setEndMessage("Time to work");
      }
    }
    timerEl.current.textContent = convertTime(time);
  };

  const startTimer = () => {
    // Reset timer when it is zero
    if (time === 0) {
      resetTimer();
    }
    setEndMessage("");
    setIsRunning(true);
    countDown = setInterval(() => runTimer(), 1000);
  };

  const stopTimer = () => {
    clearInterval(countDown);
    setIsRunning(false);
  };

  // Check if initial value has been changed
  const resetTimer = () => {
    stopTimer();
    if (selectedMode.selectedTime === 0) {
      time = selectedMode.initialTime;
    } else {
      time = selectedMode.selectedTime;
    }
    setEndMessage("");
    timerEl.current.textContent = convertTime(time);
  };

  const handleOnFocusout = (e, targetMode, ref) => {
    let updatedTime;

    // Validate min and max
    if (e.target.value < min) {
      // updatedTime = min * 60;
      updatedTime = min;
      ref.current.value = min;
    } else if (e.target.value > max) {
      updatedTime = max * 60;
      ref.current.value = max;
    } else {
      updatedTime = e.target.value * 60;
    }

    // Reflect change to current timer when change is for current mode
    if (targetMode === mode) {
      timerEl.current.textContent = convertTime(updatedTime);
      time = updatedTime;
    }

    // Update selectedTime
    if (targetMode === "pomodoro") {
      obj.pomodoro.selectedTime = updatedTime;
    } else if (targetMode === "shortBreak") {
      obj.shortBreak.selectedTime = updatedTime;
    } else if (targetMode === "longBreak") {
      obj.longBreak.selectedTime = updatedTime;
    }
  };

  const switchMode = (mode) => {
    // Stop timer
    clearInterval(countDown);
    setMode(mode);
  };

  const resetSelectedTime = () => {
    obj.pomodoro.selectedTime = 0;
    obj.shortBreak.selectedTime = 0;
    obj.longBreak.selectedTime = 0;
    resetTimer();
    pomodoroValue.current.value = obj.pomodoro.initialMin;
    shortBreakValue.current.value = obj.shortBreak.initialMin;
    longBreakValue.current.value = obj.longBreak.initialMin;
  };

  return (
    <div>
      <div id="tab-area">
        <div
          className={`pomodoro-tab tab${
            mode === "pomodoro" ? " selected" : ""
          }`}
          onClick={() => switchMode("pomodoro")}
        >
          Pomodoro
        </div>
        <div
          className={`short-break-tab tab${
            mode === "shortBreak" ? " selected" : ""
          }`}
          onClick={() => switchMode("shortBreak")}
        >
          Short Break
        </div>
        <div
          className={`long-break-tab tab${
            mode === "longBreak" ? " selected" : ""
          }`}
          onClick={() => switchMode("longBreak")}
        >
          Long Break
        </div>
      </div>
      {mode === "pomodoro" && <div className="mode">Pomodoro</div>}
      {mode === "shortBreak" && <div className="mode">Short Break</div>}
      {mode === "longBreak" && <div className="mode">Long Break</div>}
      <div id="timer" ref={timerEl}></div>
      <div id="timer-button-area">
        <div id="timer-control">
          {isRunning ? (
            <div className="timer-button" onClick={stopTimer}>
              Stop
            </div>
          ) : (
            <div className="timer-button" onClick={startTimer}>
              Start
            </div>
          )}
          <div className="timer-button" onClick={resetTimer}>
            Reset
          </div>
        </div>
        <div
          id="toggle-setting"
          className="timer-button"
          onClick={() => setIsOpenSetting(true)}
        >
          Setting
        </div>
      </div>
      <div id="timer-message">{timerMessage}</div>
      {isOpenSetting && (
        <div id="setting">
          <div id="unit">Min</div>
          <div className="length">
            Pomodoro length
            <input
              className="min-input"
              ref={pomodoroValue}
              onBlur={(e) => handleOnFocusout(e, "pomodoro", pomodoroValue)}
              type="number"
              name="pomodoro-time"
              min="1"
              max="60"
              defaultValue={
                obj.pomodoro.selectedTime / 60 || obj.pomodoro.initialMin
              }
            ></input>
          </div>
          <div className="length">
            Short Break length
            <input
              className="min-input"
              ref={shortBreakValue}
              onBlur={(e) => handleOnFocusout(e, "shortBreak", shortBreakValue)}
              type="number"
              name="short-break-time"
              min="1"
              max="60"
              defaultValue={
                obj.shortBreak.selectedTime / 60 || obj.shortBreak.initialMin
              }
            ></input>
          </div>
          <div className="length">
            Long Break length
            <input
              className="min-input"
              ref={longBreakValue}
              onBlur={(e) => handleOnFocusout(e, "longBreak", longBreakValue)}
              type="number"
              name="long-break-time"
              min="1"
              max="60"
              defaultValue={
                obj.longBreak.selectedTime / 60 || obj.longBreak.initialMin
              }
            ></input>
          </div>
          <div>
            <div
              className="setting-button ok-button"
              onClick={() => setIsOpenSetting(false)}
            >
              OK
            </div>
            <div
              className="setting-button setting-reset"
              onClick={resetSelectedTime}
            >
              Reset All Settings
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Timer;
