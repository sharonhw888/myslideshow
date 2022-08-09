
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

  fetchData(colName) {
    colName = colName || 'default';

    axios.get(`/gallery/${colName}`).then((res) => {
      console.log(res.data[0].url);
      this.setState({ url: res.data[0].url });
    });

  }
  componentDidMount() {
    axios.get('/all').then((res) => {
      this.setState({ all: res.data.map((item) => { return item.name }) });
    })
    this.fetchData();
  }

  render() {
    return (
      <>
        <h1>
          Hello <b>{this.state.userName}</b>. Nice to see you here.
        </h1>

        <AddCollection allCol={this.state.all} />
        <GalleryDisplay allURL={this.state.url}/>
      </>
    );
  }
}

export default App;
