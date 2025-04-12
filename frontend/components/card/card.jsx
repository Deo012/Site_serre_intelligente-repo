import React, { useState } from "react";
import "./card.css"
import Toggle from "../toggle/toggle";

const Card = (props)=>{

    const [expanded, setExpanded] = useState(false);


    return(
        <>
            <div>
                {
                    expanded?(
                        "<ExpendedCard/>"
                    ):
                    <CompactCard param={props}/>
                }
            </div>
        </>
    );
}

function CompactCard({param}){
    const { switch_state, onToggle, title, companyName, stateStyle } = param;

    console.log("Voci l'etat dela card temp", stateStyle)

    return(
        <div className={`compact-card ${stateStyle}`}>
            <div className="container-switch">
                <Toggle
                checked = {switch_state}
                onChange = {onToggle} //call the parent function to update switch_state
                cardTitle = {title}
                />
            </div>
            <div className="container-info">
                <span>{companyName}</span>
                <span>{title}</span>
            </div>
        </div>
    );
}

export default Card;