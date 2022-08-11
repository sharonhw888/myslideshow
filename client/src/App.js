
import React from "react";
import axios from "axios";

import SelectCollection from "./Components/selectCollection.js";
import ModModal from "./Components/modModal.js";
import GalleryDisplay from "./Components/galleryDisplay.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: 'Jane',
      showModModal: false
    }
    this.fetchData = this.fetchData.bind(this);

  }

  fetchData(colName) {
    colName = colName || 'default';

    axios.get(`/gallery/${colName}`).then((res) => {
      // console.log(res.data[0].url);
      this.setState({ url: res.data[0].url });
    });
    axios.get('/all').then((res) => {
      this.setState({ all: res.data.map((item) => { return item.name }) });
    })
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <>
        <h1>
          Hello <input className="username" placeholder="Your name here" onChange={(e) => { e.target.value }} ></input><br /> Let's build a slideshow 😉
        </h1>

        <div>
          <SelectCollection allCol={this.state.all} select={this.fetchData} />
          <button className="selectCollection" onClick={() => { this.setState({ showModModal: true }) }}>Manage collections</button>

        </div>
        {this.state.showModModal && <ModModal allCol={this.state.all} closeModal={() => { this.setState({ showModModal: false }) }} />}
        <div> Time interval:&nbsp;
          <input value={this.state.dt} placeholder="default 10 sec" onChange={(e) => { this.setState({ dt: e.target.value }) }}></input>&nbsp; in sec
        </div>
        {this.state.url && <GalleryDisplay allURL={this.state.url} dt={this.state.dt * 1000 || 10000} />}

      </>
    );
  }
}

export default App;
