import React, { useState } from 'react';
import axios from 'axios';
var cloudName = 'dls2rxfqj';
var presetName = 'ap4g9ume';
import ModModal from './modModal.js';

const ManageCollection = (props) => {

  var [selected, setSelect] = React.useState();
  var [show, setShow] = React.useState(false);

  var handleChange = (e) => {
    setSelect(e.target.value);
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
        <label>manage collection</label>
        <select onChange={handleChange}>
          {props.allCol && props.allCol.map((item) => {
            if (item === 'default') {
              return <option value={item} selected disabled hidden>select one</option>
            } else {
              return <option value={item}>{item}</option>
            }
          })}
        </select>

        {/* {show && <Modal submitForm={handleSubmit} closeModal={()=>{setSelect('default');setShow(false)}}/>} */}
      </div>
      {show && <ModModal colName={selected} closeModal={handleClose}/>}
    </>
  )
}

export default ManageCollection