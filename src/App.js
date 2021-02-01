import React from "react";
import "./App.css";
import Hangman from "./Hangman";

function App() {
    return (
      <div className="App">
        <Hangman maxWrong={6} />
      </div>
    );
}

export default App;
