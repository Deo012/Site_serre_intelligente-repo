import { CardsData } from "@/Data"
import { useState } from "react";
import ResumeCard from "../resumeCard/resumeCard.jsx";

const SerreInfo = () => {
    let [cardsData, setCardsData] = useState(CardsData);
    
    return(
        <>
            <div className="serre-infos">
                {cardsData.map((card, id)=>{
                    return (
                        <>
                            <ResumeCard
                            title= {card.title}
                            value= {card.value}
                            />
                        </>
                    )
                })}
            </div>
        </>
    );
}

export default SerreInfo;