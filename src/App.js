import React, {useState, useEffect} from "react";

import './App.css';
import GameBoard from './GameBoard';

function App() {
  const [gameStarted, setGameStarted] = useState(false);

  function handleOnClick(e){
    setGameStarted(gameStarted => !gameStarted)
  }

  return (
    <div className="App">
      
      <div>
        <button 
          className={`game-toggle ${gameStarted ? "started" : "stopped"}`}
          onClick={handleOnClick}
        >
          {gameStarted === false ? "Start Game" : "Stop Game"}
        </button>
        </div>
      <div className='game-board'>
        <GameBoard Rows={5} Cols={5} GameStarted={gameStarted} handleOnClick={handleOnClick}/>
      </div>
    </div>
  );
}

export default App;
