import React, { useState } from 'react';
import axios from 'axios';
var cloudName = 'dls2rxfqj';
var presetName = 'ap4g9ume';
import Modal from './modal.js';

const SelectCollection = (props) => {

  var [selected, setSelect] = React.useState('default');
  var [show, setShow] = React.useState(false);

  var handleChange = (e) => {
    if (e.target.value === 'create') {
      setShow(true)
      setSelect('create')
    }else{
      setSelect(e.target.value)
      props.select(e.target.value)
    }
  };

  var handleSubmit=(newName)=>{
    setShow(false);
    setSelect(newName);
    props.select(newName);
  };

  var handleClose=(newName)=>{
    if(newName){
      props.select(newName);
      setSelect(newName);
    }
    setShow(false);
    setSelect('default')
  }

  return (
    <>
      <div className="selectCollection">
        <label>select or create collection</label>
        <select onChange={handleChange}>
          <option value="create">create new</option>
          {props.allCol && props.allCol.map((item) => {
            if (item === selected) {
              return <option value={item} selected>{item}</option>
            } else {
              return <option value={item}>{item}</option>
            }
          })}
        </select>

        {/* {show && <Modal submitForm={handleSubmit} closeModal={()=>{setSelect('default');setShow(false)}}/>} */}
      </div>
      {show && <Modal closeModal={handleClose}/>}
    </>
  )
}

export default SelectCollection