/**
 * serreInfo.jsx
 * Permet de généré les cartes affichant les données des capteurs
 */
import { useState } from "react";
import ResumeCard from "../resumeCard/resumeCard.jsx";
import { useData } from "@/context/dataContext.tsx";

const SerreInfo = () => {
    const { capteursData } = useData();
    
    return(
        <>
            <div className="serre-infos">
                {capteursData.map((card, id)=>{
                    return (
                        
                        <ResumeCard
                        key= {id}
                        title= {card.title}
                        value= {card.value}
                        />
                        
                    )
                })}
            </div>
        </>
    );
}

export default SerreInfo;