import React, { useState } from 'react';
// import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
var cloudName = 'dls2rxfqj';
var presetName = 'ap4g9ume';

var Modal = (props) => {
  var [name, setName] = React.useState();
  var [photo, setPhoto] = React.useState([]);
  var [previewPhoto, setPreviewPhoto] = React.useState();
  var [newurl, setNewurl] = React.useState([]);

  var preview = () => {
    setPreviewPhoto(
      <>
        {photo.map((file) => {
          var source = URL.createObjectURL(file);
          return <img className='prePhoto' src={source}></img>
        })}
        <></>
        {newurl.map((item) => {
          return <img className='prePhoto' src={item}></img>
        })}
      </>
    )
  }


  var handleSubmit = (e) => {
    // props.closeModal(false)
    var cloudPost = [];
    photo.forEach((item) => {
      var formData = new FormData();
      formData.append("file", item)
      formData.append("upload_preset", "ap4g9ume")

      cloudPost.push(axios.post("https://api.cloudinary.com/v1_1/dls2rxfqj/image/upload", formData))

    })
    Promise.all(cloudPost).then((resProm) => {
      var link = resProm.map((item) => {
        return item.data.url;
      })
      link = link.concat(newurl);
      console.log(link)
      axios.post(`/gallery/${name}`, link).then((res) => { console.log('res from database', res) })
    }).then(() => {
      console.log(e.target.value)
      props.closeModal(e.target.value);
    })
  }

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button onClick={() => { props.closeModal() }}>x</button>
        </div>
        <div className="title">Create a collection</div>
        <div className="body">
          <div>Name:
            <input value={name} placeholder="Example: flowers" onChange={(e) => { setName(e.target.value) }} required></input>
          </div>

          {/* <span> Photos: <input onChange={(e)=>{console.log(e.target.files);setPhoto(Object.values(e.target.files))}} type='file' multiple /><button onClick={photoSubmitter}>Confirm Pictures</button></span> */}

          <div> Photos:<br />
            upload picture<input type='file' multiple /><button onClick={(e) => {
              setPhoto(photo.concat(Object.values(e.target.previousElementSibling.files)))
            }}>add</button><br />

            or paste url <input placeholder="url ..." /> <button onClick={(e) => {
              setNewurl(newurl.concat(e.target.previousElementSibling.value))
              e.target.previousElementSibling.value = '';
            }}>add</button><br />

            {/* <button onClick={preview}>Preview Pictures</button> */}
            {(photo.length || newurl.length) ? <button onClick={preview}>Preview Pictures</button> : <></>}
          </div>
          {previewPhoto}

          {/* {photo && photo.map((item) => { return <img src={item} /> })} */}
        </div>
        <div className="footer">
          <button value={name} onClick={handleSubmit} >Submit</button>
        </div>
      </div>
    </div>


  )
}

export default Modal


// https://res.cloudinary.com/dls2rxfqj/image/upload/v1660151894/xc3i8khycv6h8mh4dggy.jpg

// onChange={(e) => {setPhoto(Object.values(e.target.files)) }}