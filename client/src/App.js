
import React from "react";

class App extends React.Component {
  render() {
    const { name } = this.props;
    return (
      <>
        <h1>
          Hello {name}, hello sharon
        </h1>
      </>
    );
  }
}

export default App;
