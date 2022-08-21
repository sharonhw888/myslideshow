import React from 'react';
import axios from 'axios';

var ModModal = (props) => {
  var [selected, setSelect] = React.useState('default');
  var [url, setURL] = React.useState();
  var [photo, setPhoto] = React.useState([]);
  var [previewPhoto, setPreviewPhoto] = React.useState();
  var [newurl, setNewurl] = React.useState([]);

  var previewLocal = () => {
    setPreviewPhoto(
      <>
        {photo.map((file, index) => {
          var source = URL.createObjectURL(file);
          return <img data={'p' + index} className='prePhoto' src={source} onClick={cancelPhoto}></img>
        })}
      </>
    )
  }
  var previewNewURL = () => {
    setPreviewPhoto(
      <>
        {newurl.map((item, index) => {
          return <img data={'u' + index} className='prePhoto' src={item} onClick={cancelPhoto}></img>
        })}
      </>
    )
  }
  var viewURL = () => {
    setPreviewPhoto(
      <>
        {url.map((item, index) => {
          return <img data={'u' + index} className='prePhoto' src={item} onClick={cancelPhoto}></img>
        })}
      </>
    )
  }
  var handleChange = (e) => {
    selected = e.target.value;
    setSelect(selected);
    axios.get(`/gallery/${selected}`).then((res) => {
      url = res.data[0].url;
      setURL(res.data[0].url);
    });
  }

  var cancelPhoto = (e) => {
    var ind = e.target.attributes.data.value.slice(1);
    if (e.target.attributes.data.value[0] === 'm') {
      url.splice(ind, 1);
      viewURL();
    } else if (e.target.attributes.data.value[0] === 'p') {
      photo.splice(ind, 1);
      previewLocal();
    } else if (e.target.attributes.data.value[0] === 'u') {
      newurl.splice(ind, 1);
      // setNewurl(newurl)
      previewNewURL()
    }
  }

  var handleSubmit = () => {
    // props.closeModal(false)
    var cloudPost = [];
    console.log(photo)
    photo.forEach((item) => {
      console.log('item looks like this')
      console.log(item)
      var formData = new FormData();
      formData.append("file", item)
      formData.append("upload_preset", "ap4g9ume")

      cloudPost.push(axios.post("https://api.cloudinary.com/v1_1/dls2rxfqj/image/upload", formData))

    })
    Promise.all(cloudPost).then((resProm) => {
      var link = resProm.map((item) => {
        return item.data.url;
      })
      link = link.concat(newurl, url);
      console.log(link)
      if (link.length === 0) {
        axios.delete(`/gallery/${selected}`).then((res) => { console.log('collection deleted',res) })
      } else {
        axios.post(`/gallery/${selected}`, link).then((res) => { console.log('collection modified',res) });
      }
    }).then(() => {

      props.closeModal();
    })
  }

  return (

    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button onClick={() => { props.closeModal() }}>x</button>
        </div>
        <div className="title">Manage collections</div>
        <div className="body">
          <div className="selectCollection"> Select a collection to modify<br />
            <select onChange={handleChange}>
              {props.allCol && props.allCol.map((item) => {
                if (item === 'default') {
                  return <option value="none" selected disabled hidden>Select an Option</option>
                } else {
                  return <option value={item}>{item}</option>
                }
              })}
            </select>
          </div>

          {url && (
            <div> Add more pictures by
              <div class="addOn">
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
                }}>add</button>
              </div>

            </div>
          )}

          <div className="modImg">
            {(url&&url.length) ? <div>Delete by clicking images</div> : <></>}
            {url && url.map((item, index) => {
              return <img class="prePhoto" data={'m' + index} src={item} onClick={cancelPhoto} />
            })}
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
          <button value={name} onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>







  )
}

export default ModModal

