import React, { useState } from 'react';
import axios from 'axios';
var cloudName = 'dls2rxfqj';
var presetName = 'ap4g9ume';

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