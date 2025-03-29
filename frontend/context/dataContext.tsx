"use client"

import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { error } from "console";
import { io } from "socket.io-client"

//  Define the data structure
interface CardData{
    title: string;
    value: string;
    companyName: string;
    switch_state: boolean;
}

//  Initial Data
const initialData: CardData[] = [
    { title: "Temperature", value: "-1°C", companyName: "Amazon", switch_state: true },
    { title: "Humidité", value: "-1%", companyName: "Gaabor", switch_state: true },
    { title: "Ventillateur", value: "-1%", companyName: "Kingwin", switch_state: false },
];

//  Create Contexte
const DataContext = createContext<{
    cardsData: CardData[];
    toggleSwitchState: (index: number) => void;
} | null>(null);

const socket = io("http://localhost:3000"); // Connect to nextjs server 

//  Provider component`
//  DataProvider est de type function component. Prends comme parametre des elements renderable (FC<param>)
export const DataProvider: React.FC<{ children: React.ReactNode}> = ({ children }) =>{
    const [cardsData, setCardsData] = useState<CardData[]>(initialData)

    // Updata Context data when receiving data
    useEffect(() => {
        const handleData = (data:any) => {
            if (data.senderId === "backend") {
                setCardsData([
                    { title: "Temperature", value: `${data.temp}°C`, companyName: "Amazon", switch_state: true },
                    { title: "Humidité", value: `${data.hum}%`, companyName: "Gaabor", switch_state: true },
                    { title: "CO2", value: `${30} ppm`, companyName: "Bando", switch_state: true },
                ]);
            }
        };
    
        socket.on("update_mesurement", handleData);
    
        return () => {
            socket.off("update_mesurement", handleData);  // Cleanup on unmount to avoid stack up of event listener with that name
        };
    }, []);

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

// Custom Hook to use DataContext
export const useData = () => {
    const context = useContext(DataContext);
    return context;
};