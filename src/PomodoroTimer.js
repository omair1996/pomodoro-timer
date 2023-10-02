import React, { useState, useEffect, useRef } from 'react';

const PomodoroTimer = () => {
  const [workMinutes, setWorkMinutes] = useState(25);
  const [minutes, setMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5)
  const [seconds, setSeconds] = useState(0);

  const [isActive, setIsActive] = useState(false);
  const [sessionType, setSessionType] = useState
  ('Work');

  const audioRef = useRef(null);

  

  const handleClickSession = (action) => {
    if (!isActive) {
      if (action === 'increment' && minutes < 60) {
        setMinutes(minutes + 1);
        setWorkMinutes(workMinutes + 1);
      } else if (action === 'decrement' && minutes > 1) {
        setMinutes(minutes - 1);
        setWorkMinutes(workMinutes - 1);
      }
    }
  }


  const handleBreakLength = (action) => {
    if (!isActive) {
      if (action === 'increment' && breakMinutes < 60) {
        setBreakMinutes(breakMinutes + 1);
      } else if (action === 'decrement' && breakMinutes > 1) {
        setBreakMinutes(breakMinutes - 1);
      }
    }
  };


  useEffect(() => {
    let interval;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (workMinutes === 0 && breakMinutes === 0) {
            clearInterval(interval);
            setSessionType('Work');
            setWorkMinutes(25);
            setBreakMinutes(5);
            setMinutes(25);
            setIsActive(false);
            audioRef.current.play();
          } else if (seconds === 0 && workMinutes === 0) {
            setSessionType('Break');
            setWorkMinutes(25);
            setBreakMinutes(breakMinutes - 1);
            setMinutes(25);
            setSeconds(59);
            audioRef.current.play();
          } else if (seconds === 0) {
            setWorkMinutes(workMinutes - 1);
            setMinutes(minutes - 1);
            setSeconds(59);
            audioRef.current.play();
          } else {
            setSeconds(seconds - 1);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }


    return () => clearInterval(interval);
  }, [isActive, minutes, workMinutes, breakMinutes, seconds, sessionType]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setSessionType('Work');
    setMinutes(25);
    setWorkMinutes(25);
    setBreakMinutes(5);
    setSeconds(0);
    audioRef.current.load()
  };

  return (
    <div className="container">
      <h1 className="center-align">{sessionType} Timer By Umair</h1>
      <div className="timer">
      
        <div className='d-flex justify-content-around'>
        <div>
        <div id="break-label"><h4>Break Length</h4>
        <button id="break-decrement"
         className="btn btn-level" onClick={() => handleBreakLength('decrement')} value="-">
          <i className="fa fa-arrow-down fa-2x">Drop!</i></button><span id="break-length" style={{margin:'15px',fontSize:"23px"}}>{breakMinutes}</span>
        <button id="break-increment"
         className=" btn btn-level" onClick={() => handleBreakLength('increment')} value="+">
          <i className="fa fa-arrow-down fa-2x">Add!</i></button>
        </div>
        </div>
        <div>
        <div><div id="session-label"><h4>Session Length</h4>
        <button id="session-decrement"
         className="btn btn-level" onClick={() => handleClickSession('decrement')}  value="-"><i className="fa fa-arrow-down fa-2x">Drop!</i>
        </button><span id="session-length" style={{margin:'0 15px',fontSize:'23px'}}>{workMinutes}</span>
        <button id="session-increment"
         className=" btn btn-level" onClick={() => handleClickSession('increment')}  value="+"><i class="fa fa-arrow-up fa-2x">Add!</i></button>
        </div>
        </div>
        </div>
        </div>
        <div  style={{border:'3px solid black', borderRadius: '50px',margin:'10px 0'}}>
        <h4 id="timer-label">Session</h4>
        <h3 id="time-left">
        {String(sessionType === 'Work' ? workMinutes : breakMinutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </h3>
          </div>
      </div>
      <div className="controls">
        <button id="start_stop"
          className="btn waves-effect waves-light green"
          onClick={toggleTimer}
        >
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button id="reset"
          className="btn waves-effect waves-light red"
          onClick={resetTimer}
        >
          Reset
        </button>
        <audio id="beep" ref={audioRef} src="/alarm.mp3"  />
      </div>
      </div>

  );
};

export default PomodoroTimer;