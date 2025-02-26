import React, { useEffect, useState } from "react";
import "./slideBar.css"
import UseScript from "../../customHook/useScript";


const SlideBar = ()=>{
    let [value, setValue] = useState(0)
    //note: useEffect est appeler apres que le html soit généré
    useEffect(() => {
        const slider = document.getElementById("my-range");
        const bubble = document.querySelector(".bubble");
    
        const updateSlider = () => {
          const x = slider.value;
          setValue(x); // This updates React state asynchronously
    
          // Update slider background gradient
          slider.style.background = `linear-gradient(90deg, rgb(117,252,117) ${x}%, rgb(214,214,214) ${x}%)`;
    
          // Update bubble position and value
          bubble.innerHTML = x;
          const sliderRect = slider.getBoundingClientRect();
          const bubbleWidth = bubble.offsetWidth;
    
          // Positioning the bubble correctly relative to slider thumb
          const leftPosition = ((x / 100) * sliderRect.width) - (bubbleWidth / 2);
          bubble.style.left = `${leftPosition}px`;
        };
    
        // Attach event listener
        slider.addEventListener("input", updateSlider);
    
        // Cleanup function to remove the event listener
        return () => slider.removeEventListener("input", updateSlider);
      }, []); 

    return(
        <>
            <div className="slider-container">
                <input type="range" min="0" max="100" defaultValue="1" id="my-range" className="slider"/>
                <output className="bubble"></output>
            </div>
        </>
    );
}

export default SlideBar