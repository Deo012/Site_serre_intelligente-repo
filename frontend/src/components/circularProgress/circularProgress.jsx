import React, { useEffect, useState } from "react";
import "./CircularProgress.css"; // Import the CSS file

const CircularProgress = () => {
  const [value, setValue] = useState(10);
  const min = -50;
  const max = 50;
  const radius = 50;
  const dimension = 200;
  const strokeWidth = "10px";
  const circumference = 2 * Math.PI * radius;
  const progress = ((value - min) / (max - min)) * circumference;

  const handleIncrease = () => {
    if (value < max) setValue(value + 1);
  };

  const handleDecrease = () => {
    if (value > min) setValue(value - 1);
  };

  useEffect(()=>{
    const cercleProgres = document.querySelector(".cercle-progres");
    const circleVal = document.querySelector(".circle-value");
    if(cercleProgres){
        cercleProgres.style.strokeDasharray = circumference;
        cercleProgres.style.strokeDashoffset = progress;
        cercleProgres.style.stroke = "#60e6a8";
    }
    if(circleVal){
        circleVal.innerHTML = value;
    }
  },[value])

  return (
    <>
    <div className="progress-container">
        <svg width={dimension} height={dimension} viewBox="0 0 200 200">
            {/*Cercle  background*/}
            <circle r={radius} cx={dimension/2} cy={dimension/2} fill="transparent" stroke="#e0e0e0" strokeWidth={strokeWidth}></circle>

            {/*Cercle  progress*/}
            <circle r={radius} cx={dimension/2} cy={dimension/2} fill="transparent" stroke="#e0e0e0" strokeWidth={strokeWidth} className="cercle-progres"></circle>
        </svg>
        <div className="circle-value">
            Value
        </div>
        <div className="temp-buttons">
            <button onClick={handleDecrease}>+</button>
            <button onClick={handleIncrease}>-</button>
        </div>
    </div>
    
    </>
  );
};

export default CircularProgress;
