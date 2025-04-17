/**
 * toggle.jsx
 * Composant représentant la switch pour le controle a distance
 */
import React, { useState, useEffect } from "react";
import "./toggle.css";
import axios from "axios";

const Toggle = (props) => {

    let [state, setState] = useState(props.checked)

    // Sync local state with props.checked
    useEffect(() => {
        setState(props.checked);
    }, [props.checked]);

    function handleClick() {
        const newState = !state;
        setState(newState);
        props.onChange(newState); // Call parent function 

        // Active un composant controllable selon le nom de la carte
        if(props.cardTitle === "Ventillateur"){
            state ?  axios.post("http://192.168.1.3:5000/fan_off") : axios.post("http://192.168.1.3:5000/fan_on"); // fait une requete vers le serveur
        }else if (props.cardTitle === "Arrosage"){
            state ?  axios.post("http://192.168.1.3:5000/pompe_arrose_off") : axios.post("http://192.168.1.3:5000/pompe_arrose_on"); // fait une requete vers le serveur
        }else if (props.cardTitle === "Humidité"){
            state ?  axios.post("http://192.168.1.3:5000/pompe_hum_off") : axios.post("http://192.168.1.3:5000/pompe_hum_on"); // fait une requete vers le serveur
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