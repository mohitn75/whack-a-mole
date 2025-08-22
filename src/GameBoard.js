import React, {useState, useEffect, useRef} from "react";
import Timer from "./Timer";

export default function GameBoard(Props){

    const [moleIdx, setMoleIdx] = useState({});
    const [totalScore, setTotalScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(10);
    const [gameOver, setGameOver] = useState(false);
    const moleWhacked = useRef(false);
    let timer;

    let grid = Array.from({length: Props.Rows}, () => (
        Array.from({length: Props.Cols}, () => "")
    ));

    function onHammerClicked(row, col){
        if(Props.GameStarted && moleIdx.xCoordinate == row && moleIdx.yCoordinate == col && moleWhacked.current === false){
            console.log(row, col)
            moleWhacked.current = true;
            setTotalScore(prev => prev + 1);
        }
    }

    function onClose() {
        setGameOver(false);
    };

    function timerCallback(timeLeft){
        setTimeLeft(prev => timeLeft);
        if(timeLeft <= 0){
            setGameOver(true);
            clearInterval(timer);
            Props.handleOnClick();
        }
    }

    function getRandomeIndices(){
        setMoleIdx(prev => {
            let newX, newY;
            do {
                newX = Math.floor(Math.random() * Props.Rows);
                newY = Math.floor(Math.random() * Props.Cols);
            } while (newX === prev.xCoordinate && newY === prev.yCoordinate);
            return { xCoordinate: newX, yCoordinate: newY };
        })
    }

    useEffect(() => {
        if(Props.GameStarted === true){
            console.log("Game Started !!!")
            timer = setInterval(() => {
                getRandomeIndices();
                moleWhacked.current = false;
            }, 1000)
        }
        return(() => {
            clearInterval(timer)
        })
    },[Props.GameStarted])

    return(
        <>
         {gameOver && (
            <div className="game-over-modal">
                 <div className="game-over-content">
                     <button className="close-btn" onClick={onClose}>✖</button>
                    <h2>Game Over</h2>
                    <p>Your Score: {totalScore}</p>
                 </div>
            </div>
        )}
        <div className="board-timer">
            <div>{
                
                grid.map((row, rowIdx) => (
                    <div className = 'row' key={rowIdx}>
                        {
                            row.map((col, colIdx) => (
                                <div 
                                    className = 'col'
                                    onClick={() => onHammerClicked(rowIdx, colIdx)}
                                >
                                    { (moleIdx.xCoordinate == rowIdx && moleIdx.yCoordinate == colIdx) ? <img className='mole' src = "https://e7.pngegg.com/pngimages/347/578/png-clipart-jumping-mole-cartoon-whack-s-comics-mammal-thumbnail.png"></img> : ""}
                                </div>
                            ))
                        }
                    </div>

                ))
            }
            </div>
            <div>
            <div className="timer-card">
                <Timer gameStarted={Props.GameStarted} timeLeft={timeLeft} timerCallback={timerCallback}/>
            </div>
            <div className="scoreboard">
                {`Total Score:  ${totalScore}`}
            </div>
            </div>
        </div>
        </>
    );

}