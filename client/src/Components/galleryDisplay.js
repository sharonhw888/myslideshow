import React, { useState } from 'react';

import axios from 'axios';
import Progress from './progress.js';
var cloudName = 'dls2rxfqj';
var presetName = 'ap4g9ume';

var GalleryDisplay = (props) => {

  const [currentSlide, setCurrentSlide] = React.useState(0);
  var [done, setDone] = React.useState(0);
  var [autoScroll, setAutoScroll] = React.useState(false);
  // const autoScroll = true;
  let intervalTime = props.dt / 10;

  let slideInterval;
  var num = 0;

  const nextSlide = () => {
    num += 10;
    if (num === 100) {
      clearInterval(slideInterval);
      setCurrentSlide(currentSlide >= props.allURL.length - 1 ? 0 : currentSlide + 1);
    }
    setDone(num);
  };
  const preSlide = () => {
    setCurrentSlide(currentSlide === 0 ? props.allURL.length - 1 : currentSlide - 1);
  };

  var auto = () => {
    // num = 0;
    slideInterval = setInterval(nextSlide, intervalTime);
  }

  // React.useEffect(() => {
  //   setCurrentSlide(0)
  // }, []);
  React.useEffect(() => {
    console.log('currentslide chnage')
    if (autoScroll) {
      setDone(0)
      auto();
    }
  }, [currentSlide])

  React.useEffect(() => {
    console.log(slideInterval)
    clearInterval(slideInterval)
    if(autoScroll){
      auto();
    }
  }, [autoScroll])


  return (
    <div className="slider">
      <div className="preSymbol" onClick={preSlide}>&#8592;</div>
      <div className="mainDisplay">
        {props.allURL && props.allURL.map((item, index) => {
          return (
            <div className={index === currentSlide ? 'slide current' : 'slide'} key={index}>
              {index === currentSlide &&
                autoScroll?<img class="bigDisplay" src={item} />:<div className="empty">pause don't peek</div>
                // <img src={item} />
              }
            </div>
          )
        })}
      </div>
      <div className="nextSymbol" onClick={() => { setCurrentSlide(currentSlide === props.allURL.length - 1 ? 0 : currentSlide + 1); }}>&#8594;</div>
      <button className="play" onClick={() => { setAutoScroll(!autoScroll) }}>{autoScroll ? "⏸️":"▶️" }</button>
      <Progress done={done} />

    </div>
  )
}

export default GalleryDisplay