
import React from "react";
import AddCollection from "./Components/addCollection.js";
import GalleryDisplay from "./Components/galleryDisplay.js";

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      userName='Jane'
    }
  }
  render() {
    const { name } = this.props;
    return (
      <>
        <h1>
          Hello {name}. Nice to see you here.
        </h1>
        <AddCollection/>
        <GalleryDisplay/>
      </>
    );
  }
}

export default App;
