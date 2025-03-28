import React, { useState } from "react";
import "./toggle.css";
import axios from "axios";

const Toggle = (props) => {

    let [state, setState] = useState(props.checked)

    function handleClick() {
        const newState = !state;
        setState(newState);
        props.onChange(newState); // Call parent function 

        if(props.cardTitle){
            state ?  axios.post("http://10.0.0.236:5000/fan_off") : axios.post("http://10.0.0.236:5000/fan_on"); // fait une requete vers le serveur
        }
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