import React from 'react';
import Modal from './modal2.js';

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
        <label>Select/Create a collection</label>
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
      </div>
      {show && <Modal closeModal={handleClose}/>}
    </>
  )
}

export default SelectCollection