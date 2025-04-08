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

    return(
        <div className={`compact-card ${stateStyle}`}
        style={{
            background : "lightblue",
            boxShadow : "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px"
        }}
        >
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