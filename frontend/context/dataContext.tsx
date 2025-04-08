"use client"

import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

//  Define the data structure to contain sensors data
interface CapteurData{
    title: string;
    value: string;   
    companyName: string;
}

// Define data structure for controllable device
interface RemoteDevice{
    title: string;  
    companyName: string;
    switch_state: boolean;
}

// Data stucture for database info
interface PlanteInfo{
    humidite_max: number;
    humidite_min: number;
    id: number;
    nom: string;
    temp_max: number;
    temp_min: number;
}

//  Initial Data
const initialData: CapteurData[] = [
    { title: "Tempurature", value: "-11°C", companyName: "Pompe" },
    { title: "Humidité", value: "-11%", companyName: "Test" },
    { title: "CO2", value: "-11ppm", companyName: "Kingwin" },
];

//  Liste of remote device
const deviceList: RemoteDevice[] = [
    { title: "Ventillateur", companyName: "Kingwin", switch_state: false },
    { title: "Humidité", companyName: "Pompe", switch_state: false },
    { title: "Arrosage", companyName: "Pompe", switch_state: false }
]

// initial plante infos
const planteInfo: PlanteInfo = {
    humidite_max: 0,
    humidite_min: 0,
    id: 0,
    nom: "",
    temp_max: 0,
    temp_min: 0,
}

//  Create Contexte
const DataContext = createContext<{
    capteursData: CapteurData[];
    remoteDevices: RemoteDevice[];
    toggleSwitchState: (index: number) => void;
    plantdata: PlanteInfo;
} | null>(null);

//  Provider component`
//  DataProvider est de type function component. Prends comme parametre des elements renderable (FC<param>)
export const DataProvider: React.FC<{ children: React.ReactNode}> = ({ children }) =>{
    const [capteursData, setcapteursData] = useState<CapteurData[]>(initialData)
    const [remoteDevices, setRemoteDevices] = useState<RemoteDevice[]>(deviceList)
    const [plantdata, setplantdata] = useState<PlanteInfo>(planteInfo)

    //  Requete vers serveur Flask pour recevoir le data
    const fetchData = () => {
        axios.get("http://localhost:5000/retreiveData")
            .then((response) => {
                setcapteursData([
                    { title: "Temperature", value: `${response.data.temp}°C`, companyName: "Pompe" },
                    { title: "Humidité", value: `${response.data.hum}%`, companyName: "Pompe" },
                    { title: "CO2", value: `${response.data.co2} ppm`, companyName: "Kingwin" },
                ]);
            })
            .catch((error) => console.error("Error fetching data:", error));
    };

    // Fetch data initially and then every 5 seconds
    useEffect(() => {
        fetchData(); // Initial fetch
        const interval = setInterval(fetchData, 5000); // Fetch every 30 seconds

        //fetchPlantData();

        return () => clearInterval(interval); // Cleanup interval on unmount
    }, []);

    const toggleSwitchState = (index: number) => {
        setRemoteDevices((prevDevices) => 
            prevDevices.map((device, i) => 
                i === index ? { ...device, switch_state: !device.switch_state } : device
            )
        );
    };

    return(
        <DataContext.Provider value={{capteursData, toggleSwitchState, remoteDevices, plantdata}}>
            {children}
        </DataContext.Provider>
    );
}

// Custom Hook to use DataContext
export const useData = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error("useData must be used within a DataProvider");
    }
    return context;
};