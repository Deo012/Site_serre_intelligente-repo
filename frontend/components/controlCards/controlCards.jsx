import React, { useState } from "react";
import "./controlCards.css"
import Card from "../card/card";
import { CardsData } from "../../Data";

const ControlCards = () => {
    let [cardsData, setCardsData] = useState(CardsData);

    // Function to update switch_state for a specific card
    const handleToggle = (index) => {
        const newCards = [...cardsData]; // Create a copy of the array
        newCards[index].toggleSwitchState(); // Call the function
        setCardsData(newCards); // Update state to trigger re-render
    };

    return (
        <>
            <div className="control-cards">
                {cardsData.map((card, id) => {
                    return(
                        <div className="parent-container">
                            <Card
                            title= {card.title}
                            value= {card.value}
                            buttonState= {card.buttonState}
                            companyName = {card.companyName}
                            switch_state = {card.switch_state}
                            onToggle={() => handleToggle(id)}
                            />
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default ControlCards;