import React from "react";
import "./App.css";
import WordShark from "./WordShark";

function App() {
    return (
      <div className="App">
        <WordShark maxWrong={6} />
      </div>
    );
}

export default App;
