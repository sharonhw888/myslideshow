import React, { useState } from 'react';
import axios from 'axios';
var cloudName = 'dls2rxfqj';
var presetName = 'ap4g9ume';

var Modal = (props) => {
  var [name, setName] = React.useState();
  var [photo, setPhoto] = React.useState([]);
  var [url, setURL] = React.useState([]);

  var handleSubmit = (e) => {
    console.log('clicked')
  }


  var photoSubmitter = () => {
    var cloudPost = [];
    photo.forEach((item) => {
      var formData = new FormData();
      formData.append("file", item)
      formData.append("upload_preset", "ap4g9ume")

      cloudPost.push(axios.post("https://api.cloudinary.com/v1_1/dls2rxfqj/image/upload", formData))

    })
    Promise.all(cloudPost).then((resProm) => {
      setURL(resProm.map((item) => {
        return item.data.url;
      }));
      axios.post(`/gallery/${name}`, url).then((res) => { console.log('res from database', res) })
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
          <label>Name:<input value={name} placeholder="Example: flowers" onChange={(e) => { setName(e.target.value) }} required></input></label>

          {/* <span> Photos: <input onChange={(e)=>{console.log(e.target.files);setPhoto(Object.values(e.target.files))}} type='file' multiple /><button onClick={photoSubmitter}>Confirm Pictures</button></span> */}

          <span> Photos: <input onChange={(e) => { setPhoto(Object.values(e.target.files)) }} type='file' multiple /><button onClick={photoSubmitter}>Confirm Pictures</button></span>


          {/* {photo && photo.map((item) => { return <img src={item} /> })} */}
        </div>
        {/* <div className="footer">
          <button onClick={handleSubmit}>Submit</button>
        </div> */}
      </div>
    </div>
  )
}

export default Modal