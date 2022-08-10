import React, { useState } from 'react';
import axios from 'axios';
var cloudName = 'dls2rxfqj';
var presetName = 'ap4g9ume';

var Modal = (props) => {
  var [name, setName] = React.useState();
  var [photo, setPhoto] = React.useState([]);
  var [previewPhoto, setPreviewPhoto] = React.useState();

  var preview = () => {
    setPreviewPhoto(
      <>
        {photo.map((file) => {
          var source = URL.createObjectURL(file);
          return <img className='prePhoto' src={source}></img>
        })}
      </>
    )
  }


  var handleSubmit = () => {
    props.closeModal(false)
    var cloudPost = [];
    photo.forEach((item) => {
      var formData = new FormData();
      formData.append("file", item)
      formData.append("upload_preset", "ap4g9ume")

      cloudPost.push(axios.post("https://api.cloudinary.com/v1_1/dls2rxfqj/image/upload", formData))

    })
    Promise.all(cloudPost).then((resProm) => {
      var link=resProm.map((item) => {
        return item.data.url;
      })
      axios.post(`/gallery/${name}`, link).then((res) => { console.log('res from database', res) })
    });

  }

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button onClick={() => { props.closeModal(false) }}>x</button>
        </div>
        <div className="title">Create a collection</div>
        <div className="body">
          <div>Name:
            <input value={name} placeholder="Example: flowers" onChange={(e) => { setName(e.target.value) }} required></input>
          </div>

          {/* <span> Photos: <input onChange={(e)=>{console.log(e.target.files);setPhoto(Object.values(e.target.files))}} type='file' multiple /><button onClick={photoSubmitter}>Confirm Pictures</button></span> */}

          <div> Photos:
            <input onChange={(e) => { setPhoto(Object.values(e.target.files)) }} type='file' multiple />{!previewPhoto&&<button onClick={preview}>Preview Pictures</button>}
          </div>
          {previewPhoto}

          {/* {photo && photo.map((item) => { return <img src={item} /> })} */}
        </div>
        <div className="footer">
          <button onClick={handleSubmit} >Submit</button>
        </div>
      </div>
    </div>
  )
}

export default Modal