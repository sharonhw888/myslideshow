import React from 'react';
import axios from 'axios';


var Modal = (props) => {
  var [name, setName] = React.useState();
  var [photo, setPhoto] = React.useState([]);
  var [previewPhoto, setPreviewPhoto] = React.useState();
  var [newurl, setNewurl] = React.useState([]);


  var cancelPhoto = (e) => {
    var ind = e.target.attributes.data.value.slice(1);
    if (e.target.attributes.data.value[0] === 'p') {
      photo.splice(ind, 1);
      preview();
    } else if (e.target.attributes.data.value[0] === 'u') {
      newurl.splice(ind, 1);
      preview();
    }

  }

  var preview = () => {
    setPreviewPhoto(
      <>
        {photo.map((file, index) => {
          var source = URL.createObjectURL(file);
          return <img data={'p' + index} className='prePhoto' src={source} onClick={cancelPhoto}></img>
        })}
        <></>
        {newurl.map((item, index) => {
          return <img data={'u' + index} className='prePhoto' src={item} onClick={cancelPhoto}></img>
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
      console.log(name)
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
          <div className="colName">Name:<br />
            <input value={name} placeholder="Collection name" onChange={(e) => { setName(e.target.value) }} required></input>
          </div>
          <div className="addPhoto">
            <div class="addTitle">Photos: click on "add" to add picture; click on "preview" to preview before submission</div>
            <div className="addOn">
              <div className="addText">upload picture</div>
              <input className="addImg" type='file' multiple />
              <button className="addButton" onClick={(e) => {
                setPhoto(photo.concat(Object.values(e.target.previousElementSibling.files)))
              }}>add</button>
            </div>

            <div className="addOn">
              <div className="addText">or paste url</div>
              <input className="addImg" placeholder="url ..." />
              <button className="addButton" onClick={(e) => {
                setNewurl(newurl.concat(e.target.previousElementSibling.value))
                e.target.previousElementSibling.value = '';
              }}>add</button><br />
            </div>
          </div>

          <div className="photoDisplay">
            {((photo.length || newurl.length) && previewPhoto) ? <div>click on image to delete</div> : <></>}
            {/* {(photo.length || newurl.length) && previewPhoto} */}
            {newurl && newurl.map((item, index) => {
              return <img class="prePhoto" data={'u' + index} src={item} onClick={cancelPhoto} />
            })}
            {photo && photo.map((file, index) => {
              var source = URL.createObjectURL(file);
              return <img class="prePhoto" data={'p' + index} src={source} onClick={cancelPhoto} />
            })}
          </div>

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