import React, { useState } from 'react';
import axios from 'axios';
var cloudName = 'dls2rxfqj';
var presetName = 'ap4g9ume';

var GalleryDisplay=(props)=>{
  var setIntervalFunction=()=>{
    var counter=0;
    setInterval(()=>{
      document.getElementById('radio'+counter).checked=true;
      counter++;
      if(counter>3){
        counter=0;
      }
  },500)
  }
  return(
    <div className="slider">
      <div className="slides">
        {props.allURL&&props.allURL.map((item,index)=>{
          return(
          <input type="radio" name="radio-btn" id={"radio"+index}></input>
          )})}
        {props.allURL&&props.allURL.map((item,index)=>{
          if(index===0){
            return(
              <div className="slide first">
                <img src={item} alt=""/>
              </div>
            )
          }
          return(
            <div className="slide">
                <img src={item} alt=""/>
            </div>
          )
        })}
        <div class="navigation-auto">
        {props.allURL&&props.allURL.map((item,index)=>{
          return(
            <div className={"auto-btn"+index}></div>
          )
        })}
        </div>
        <div class="navigation-manual">
        {props.allURL&&props.allURL.map((item,index)=>{
          return(
            <label htmlFor={"radio"+index} class="manual-btn"></label>
          )
        })}
        </div>
      </div>
        {setIntervalFunction}
      {/* {props.allURL&&props.allURL.map((item)=>{return<img src={item}/>})} */}
    </div>
  )
}

export default GalleryDisplay




body{
  margin:0;
  padding:0;
  height:100vh;
  display:flex;
  justify-content: center;
  align-items: center;
  background-color: aqua;
}

.slider{
  width:800px;
  height: 500px;
  border-radius: 10px;
  overflow: hidden;
}

.slides{
  width: 500%;
  height: 500px;
  display: flex;
}

.slides input{
  display:none;
}

.slide{
  width:20%;
  transition: 2s;
}

.slide img{
  /* width:800px; */
  height: 500px;
}

.navigation-manual{
  position: absolute;
  width: 800px;
  margin-top: -40px;
  display: flex;
  justify-content: center;
}

.manual-btn{
  border: 2px solid blue;
  pad: 5px;
  border-radius: 10px;
  cursor: pointer;
  transition: 1s;
}

.manual-btn:not(:last-child){
  margin-right: 40px;
}
.manual-btn:hover{
  background:yellow;
}

#radio0:checked ~ .first{
  margin-left: 0;
}

#radio1:checked ~ .first{
  margin-left: -20%;
}

#radio2:checked ~ .first{
  margin-left: -40%;
}

#radio3:checked ~ .first{
  margin-left: -60%;
}

.navigation-auto{
  position: absolute;
  display:flex;
  width:800px;
  justify-content: center;
  margin-top: 460px;
}

.navigation-auto div{
  border: 2px solid purple;
  padding: 5px;
  border-radius: 10px;
  transition: 1s;
}

.navigation-auto div:not(:last-child){
  margin-right: 40px;
}

#radio0:checked ~ .navigation-auto .auto-btn0{
  background: pink;
}
#radio1:checked ~ .navigation-auto .auto-btn1{
  background: pink;
}
#radio2:checked ~ .navigation-auto .auto-btn2{
  background: pink;
}
#radio3:checked ~ .navigation-auto .auto-btn3{
  background: pink;
}






