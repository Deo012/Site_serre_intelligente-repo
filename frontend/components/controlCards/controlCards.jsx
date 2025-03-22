import React, { useState } from "react";
import "./controlCards.css"
import Card from "../card/card";
import { CardsData } from "../../Data";
import { useData } from "@/context/dataContext";

const ControlCards = () => {
    const {cardsData, toggleSwitchState} = useData();

    return (
        <>
            <div className="control-cards">
                {cardsData.map((card, id) => {
                    return(
                        <div className="parent-container" key={id}>
                            <Card
                            title= {card.title}
                            value= {card.value}
                            buttonState= {card.buttonState}
                            companyName = {card.companyName}
                            switch_state = {card.switch_state}
                            onToggle={() => toggleSwitchState(id)} //   active la fonction du contexte
                            />
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default ControlCards;