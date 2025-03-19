"use client"

import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { error } from "console";

//  Define the data structure
interface CardData{
    title: string;
    value: string;
    companyName: string;
    switch_state: boolean;
}

//  Initial Data
const initialData: CardData[] = [
    { title: "Temperature", value: "28°C", companyName: "Amazon", switch_state: true },
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

    //  Requete vers serveur Flask pour recevoir le data
    const fetchData = () => {
        axios.get("http://localhost:5000/retreiveData")
            .then((response) => {
                setCardsData([
                    { title: "Temperature", value: `${response.data.temp}°C`, companyName: "Amazon", switch_state: true },
                    { title: "Humidité", value: `${response.data.hum}%`, companyName: "Gaabor", switch_state: true },
                    { title: "CO2", value: `${response.data.co2} ppm`, companyName: "Bando", switch_state: true },
                ]);
            })
            .catch((error) => console.error("Error fetching data:", error));
    };

    // Fetch data initially and then every 30 seconds
    useEffect(() => {
        fetchData(); // Initial fetch
        const interval = setInterval(fetchData, 30000); // Fetch every 30 seconds

        return () => clearInterval(interval); // Cleanup interval on unmount
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