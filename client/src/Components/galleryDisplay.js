import React, { useState } from 'react';
import axios from 'axios';
import Progress from './progress.js';
var cloudName = 'dls2rxfqj';
var presetName = 'ap4g9ume';

var GalleryDisplay = (props) => {

  const [currentSlide, setCurrentSlide] = React.useState(0);
  var [done,setDone]=React.useState(0);

  const autoScroll = true;
  let slideInterval;
  let intervalTime = props.dt/10;

  var num=0;

  const nextSlide = () => {
    num+=10;
    setDone(num)
    if(num===100){
      setCurrentSlide(currentSlide === props.allURL.length - 1 ? 0 : currentSlide + 1);
      clearInterval(slideInterval)
    }
    // progressDone(done)
  };
  const preSlide = () => {
    setCurrentSlide(currentSlide === 0 ? props.allURL.length - 1 : currentSlide - 1)
  };


  var auto = () => {
    num=0;
    slideInterval = setInterval(nextSlide, intervalTime);
  }

  // React.useEffect(() => {
  //   setCurrentSlide(0)
  // }, []);
  React.useEffect(() => {
    if (autoScroll) {
      auto();
    }
  }, [currentSlide])

  // React.useEffect(() => {
  //   setInterval(()=>{
  //     setDone(done+10)
  //   },1000)
  // }, [currentSlide])

  return (
    <div className="slider">
      <div onClick={preSlide}>&#8592;</div>
      {props.allURL && props.allURL.map((item, index) => {
        return (
          <div className={index === currentSlide ? 'slide current' : 'slide'} key={index}>
            {index === currentSlide && (
              <img src={item} />
            )}
          </div>
        )
      })}
      <div onClick={nextSlide}>&#8594;</div>
      <Progress done={done}/>

    </div>
  )
}

export default GalleryDisplay