import React from 'react';

var Progress = (props) => {

  return (
    <div className="progress">
        <div id="myBar" className="progress-done" data-done="70" style={{
          opacity:1,
          width:`${props.done}%`,
        }}>{props.done}%</div>
      </div>
  )
}

export default Progress