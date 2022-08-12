import React from 'react';

import Progress from './progress.js';


var GalleryDisplay = (props) => {

  const [currentSlide, setCurrentSlide] = React.useState(0);
  var [done, setDone] = React.useState(0);
  var [autoScroll, setAutoScroll] = React.useState(false);
  var [intervalID,setIntervalID]=React.useState();

  let intervalTime = props.dt / 10;

  // let intervalID;
  var num = 0;

  const nextSlide = () => {
    num += 10;
    if (num === 100) {
      clearInterval(intervalID);
      setCurrentSlide(currentSlide >= props.allURL.length - 1 ? 0 : currentSlide + 1);
    }
    setDone(num);
  };
  const preSlide = () => {
    setCurrentSlide(currentSlide === 0 ? props.allURL.length - 1 : currentSlide - 1);
  };

  var auto = () => {
    num=0;
    setDone(0)
    setIntervalID(setInterval(nextSlide, intervalTime))
  }


  var resume=()=>{
    num=done;
    setIntervalID(setInterval(nextSlide, intervalTime));
  }

  // React.useEffect(() => {
  //   setCurrentSlide(0)
  // }, []);
  React.useEffect(() => {
    console.log('currentslide change')
    clearInterval(intervalID)
    if (autoScroll) {
      auto();
    }
  }, [currentSlide])

  React.useEffect(() => {
    console.log('collection change')
    clearInterval(intervalID);
    setCurrentSlide(0)
    setAutoScroll(false);
    if (autoScroll) {
      auto();
    }
  }, [props.allURL])

  React.useEffect(() => {
    clearInterval(intervalID)
    console.log(num)
    if(autoScroll){
      // auto();
      resume();
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
                autoScroll?<img class="bigDisplay" src={item} />:<div className="empty">pause. don't peek</div>
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