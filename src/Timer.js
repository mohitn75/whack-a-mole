import React, { useState, useEffect } from "react";

export default function Timer({ timeLeft: initialTime, gameStarted, timerCallback }) {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    setTimeLeft(initialTime);

    if (!gameStarted) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          timerCallback(0);
          return 0; 
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStarted, initialTime]);

  return (
    <div className="timer">
      {`Time Left: ${timeLeft}`}
    </div>
  );
}
