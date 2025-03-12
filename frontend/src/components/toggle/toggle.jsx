import React, { useState } from "react";
import "./toggle.css";

const Toggle = (props) => {

    let [state, setState] = useState(props.checked)

    function handleClick() {
        const newState = !state;
        setState(newState);
        props.onChange(newState); // Call parent function 
    }

    return(
        <>
        <label className="switch">
            <input type="checkbox" checked={state} onChange={handleClick}/>
            <span className="slider round"></span>
        </label>
        </>
    );
}

export default Toggle;