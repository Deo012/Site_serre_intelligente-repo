import { useState } from "react";
import ResumeCard from "../resumeCard/resumeCard.jsx";
import { useData } from "@/context/dataContext.tsx";

const SerreInfo = () => {
    const { cardsData } = useData();
    
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