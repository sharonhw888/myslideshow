
import React from "react";
import axios from "axios";
import AddCollection from "./Components/addCollection.js";
import GalleryDisplay from "./Components/galleryDisplay.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: 'Jane'
    }
    this.fetchData = this.fetchData.bind(this)
  }

  handleSubmit = (e) => {
    console.log('clicked')
  }

  photoHandler = (e) => {

    var files = e.target.files;
    var photos = [];
    for (var i = 0; i < files.length; i++) {
      photos.push(files[i])
    }
    this.setState({
      photos: photos
    })
  }

  photoSubmitter = () => {
    var cloudPost = [];
    this.state.photos.forEach((item) => {
      var formData = new FormData();
      formData.append("file", item)
      formData.append("upload_preset", "ap4g9ume")

      cloudPost.push(axios.post("https://api.cloudinary.com/v1_1/dls2rxfqj/image/upload", formData))

    })
    Promise.all(cloudPost).then((resProm) => {
      var url = resProm.map((item) => {
        return item.data.url;
      });
      console.log(url);
      axios.post('/gallery/add',url).then((res)=>{console.log('res from database',res)})
    });

  }


  fetchData(colName) {
    colName = colName || 'default';
    axios.get(`/gallery/${colName}`).then((res) => { console.log(res); this.setState({ url: res.url }) })
  }
  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <>
        <h1>
          Hello <b>{this.state.userName}</b>. Nice to see you here.
        </h1>

        <span> Photos <input onChange={this.photoHandler} type='file' multiple /><button onClick={this.photoSubmitter}>Confirm Pictures</button></span>
        <AddCollection />
        <GalleryDisplay />
      </>
    );
  }
}

export default App;
