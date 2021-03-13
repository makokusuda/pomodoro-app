import React, { useRef, useState, useEffect } from "react";

const initialPomodoroMin = 25;
const initialShortBreakMin = 5;
const initialLongBreak = 15;
let selectedMode;

const obj = {
  pomodoro: {
    initialMin: initialPomodoroMin,
    initialTime: initialPomodoroMin * 60,
    selectedTime: 0,
  },
  shortBreak: {
    initialMin: initialShortBreakMin,
    initialTime: initialShortBreakMin * 60,
    selectedTime: 0,
  },
  longBreak: {
    initialMin: initialLongBreak,
    initialTime: initialLongBreak * 60,
    selectedTime: 0,
  },
};

const Timer = () => {
  let countDown = null;
  let time; // Calculate using value in time
  const min = 1;
  const max = 60;

  let timerEl = useRef(null);
  const startButton = useRef(null);
  const stopButton = useRef(null);
  const pomodoroValue = useRef(null);
  const shortBreakValue = useRef(null);
  const longBreakValue = useRef(null);

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
    // Set initial timer
    if (mode === "pomodoro") {
      selectedMode = obj.pomodoro;
    }
    if (mode === "shortBreak") {
      selectedMode = obj.shortBreak;
    }
    if (mode === "longBreak") {
      selectedMode = obj.longBreak;
    }

    // Check if initial value has been changed
    if (selectedMode.selectedTime === 0) {
      time = selectedMode.initialTime;
    } else {
      time = selectedMode.selectedTime;
    }

    timerEl.current.textContent = convertTime(time);
    startButton.current.style.display = "block";
    stopButton.current.style.display = "none";
  }, [mode]);

  const runTimer = () => {
    if (time > 0) {
      time--;
    } else {
      stopTimer();
    }
    timerEl.current.textContent = convertTime(time);
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
    // Check if initial value has been changed
    if (selectedMode.selectedTime === 0) {
      time = selectedMode.initialTime;
    } else {
      time = selectedMode.selectedTime;
    }
    timerEl.current.textContent = convertTime(time);
  };

  const handleOnFocusout = (e, targetMode, ref) => {
    let updatedTime;

    // Validate min and max
    if (e.target.value < min) {
      updatedTime = min * 60;
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

  return (
    <div>
      This is timer
      {mode === "pomodoro" && <div>Pomodoro mode</div>}
      {mode === "shortBreak" && <div>Short Break mode</div>}
      {mode === "longBreak" && <div>Long Break mode</div>}
      <div onClick={() => switchMode("pomodoro")}>pomodoro</div>
      <div onClick={() => switchMode("shortBreak")}>short break</div>
      <div onClick={() => switchMode("longBreak")}>long break</div>
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
        <input
          ref={pomodoroValue}
          onBlur={(e) => handleOnFocusout(e, "pomodoro", pomodoroValue)}
          type="number"
          name="pomodoro-time"
          min="1"
          max="60"
          defaultValue={obj.pomodoro.initialMin}
        ></input>
      </div>
      <div>
        Short Break length : Minutes
        <input
          ref={shortBreakValue}
          onBlur={(e) => handleOnFocusout(e, "shortBreak", shortBreakValue)}
          type="number"
          name="short-break-time"
          min="1"
          max="60"
          defaultValue={obj.shortBreak.initialMin}
        ></input>
      </div>
      <div>
        Long Break length : Minutes
        <input
          ref={longBreakValue}
          onBlur={(e) => handleOnFocusout(e, "longBreak", longBreakValue)}
          type="number"
          name="long-break-time"
          min="1"
          max="60"
          defaultValue={obj.longBreak.initialMin}
        ></input>
      </div>
    </div>
  );
};

export default Timer;
