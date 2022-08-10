
import React from "react";
import axios from "axios";
import SelectCollection from "./Components/selectCollection.js";
import GalleryDisplay from "./Components/galleryDisplay.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: 'Jane',
      dt:10000,
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

        <SelectCollection allCol={this.state.all} select={this.fetchData} />
        <input value={this.state.dt} placeholder="default time interval is 10 sec" onChange={(e)=>{this.setState({dt:e.target.value})}}></input>
        {this.state.url && <GalleryDisplay allURL={this.state.url} dt={this.state.dt}/>}

      </>
    );
  }
}

export default App;
