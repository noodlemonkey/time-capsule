import React from 'react';

const TimeInput = (props) => {
  return (
    <div>
      <label>Hours:</label>
      <input type="number" max="24" min="0" onChange={props.handleHour}></input>
      <label>Minutes:</label>
      <input
        type="number"
        max="59"
        min="0"
        onChange={props.handleMinute}
      ></input>
      <label>Seconds:</label>
      <input
        type="number"
        max="59"
        min="0"
        onChange={props.handleSecond}
      ></input>
    </div>
  );
};

export default TimeInput;
