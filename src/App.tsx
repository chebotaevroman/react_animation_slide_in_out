import React from "react";

import Collapse from "./components/Collapse";
import List from "./components/List";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Collapse>
        <List />
      </Collapse>
    </div>
  );
}

export default App;
