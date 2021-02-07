import React from "react";
import "./App.css";
import WordShark from "./WordShark";

function App() {
    return (
      <div className="App">
        <WordShark maxWrong={8} />
      </div>
    );
}

export default App;
