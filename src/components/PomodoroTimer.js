import React, { useState, useEffect } from 'react';

const PomodoroTimer = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          clearInterval(interval);
          setIsActive(false);
          if (isBreak) {
            setMinutes(25);
            setIsBreak(false);
          } else {
            setMinutes(5);
            setIsBreak(true);
          }
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, minutes, seconds, isBreak]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setMinutes(25);
    setSeconds(0);
    setIsBreak(false);
  };

  return (
    <div className="pomodoro-timer">
      <div className="timer">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>
      <div className="controls">
        <button onClick={toggleTimer}>{isActive ? 'Pause' : 'Start'}</button>
        <button onClick={resetTimer}>Reset</button>
      </div>
      <div className="status">
        {isBreak ? 'Break Time' : 'Work Time'}
      </div>
    </div>
  );
};

export default PomodoroTimer;
