import React, { createContext, useState } from "react";

//  Define the data structure
interface CardData{
    title: string;
    value: string;
    companyName: string;
    switch_state: boolean;
}

//  Initial Data
const initialData: CardData[] = [
    { title: "Temperature", value: "68°C", companyName: "Amazon", switch_state: false },
    { title: "Humidité", value: "48,2%", companyName: "Gaabor", switch_state: true },
    { title: "CO2", value: "30%", companyName: "Bando", switch_state: true },
];

//  Create Contexte
const DataContext = createContext<{
    cardsData: CardData[];
    toggleSwitchState: (index: number) => void;
} | null>(null);

//  Provider component`
//  DataProvider est de type function component. Prends comme parametre des elements renderable (FC<param>)
export const DataProvider: React.FC<{ children: React.ReactNode}> = ({ children }) =>{
    const [cardsData, setCardsData] = useState<CardData[]>(initialData)

    const toggleSwitchState = (index: number) => {
        setCardsData((prevCards) => 
            prevCards.map((card, i) => 
                i === index ? { ...card, switch_state: !card.switch_state } : card
            )
        );
    };

    return(
        <DataContext.Provider value={{cardsData, toggleSwitchState}}>
            {children}
        </DataContext.Provider>
    );
}