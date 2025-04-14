import React, { useEffect, useState } from "react";
import "./controlCards.css"
import Card from "../card/card";
import { useData } from "@/context/dataContext";
import axios from "axios";

const ControlCards = () => {
    const {remoteDevices, toggleSwitchState, plantdata, capteursData} = useData();
    interface CardStatus {
        tempStat: "chaud" | "froid" | "neutre",
        humStat: "inonde" | "sec" | "neutre",
        humAirStat: "trop" | "peu" | "neutre"
    }

    // Servira a changer les couleurs dans le style
    const [status, setStatus] = useState<CardStatus>({
        tempStat: "neutre",
        humStat: "neutre",
        humAirStat: "neutre",
    });

    useEffect(() => {
        if (!capteursData.length || !plantdata) return;

        // Logic pour allumer les fans si temp trop haut ou trop bas
        const temp_actuel = parseFloat(capteursData[0].value.replace("°C", ""));
        const temp_min = plantdata.temp_min;
        const temp_max = plantdata.temp_max;

        if (temp_actuel > temp_max) {

            setStatus(prev => ({ ...prev, tempStat: "chaud" }));
            axios.post("http://10.0.0.236:5000/fan_on")
            console.log("Ventillateur allume")
            // To-Do: ajouter logique pour éteindre les lumières chauffantes
        
        } else if (temp_actuel < temp_min) {

            setStatus(prev => ({ ...prev, tempStat: "froid" }));
            axios.post("http://10.0.0.236:5000/fan_off")
            console.log("Ventillateur eteint")
            // To-Do: ajouter logique pour allumer les lumières chauffantes

        } else {
            setStatus(prev => ({ ...prev, tempStat: "neutre" }));
            console.log("Ventillateur eteint")
        }
    }, [capteursData, plantdata, remoteDevices, toggleSwitchState]);

    return (
        <>
            <div className="control-cards">
                {remoteDevices.map((device, id) => {

                    let deviceStatus = "neutre";
                    if (device.title.toLowerCase().includes("ventillateur")) {
                        deviceStatus = status.tempStat;
                    } else if (device.title.toLowerCase().includes("arrosage")) {
                        deviceStatus = status.humStat;
                    } else if (device.title.toLowerCase().includes("hum")) {
                        deviceStatus = status.humAirStat;
                    }

                    return(
                        <div className="parent-container" key={id}>
                            <Card
                            title= {device.title}
                            companyName = {device.companyName}
                            switch_state = {device.switch_state}
                            onToggle={() => toggleSwitchState(id)} //   active la fonction du contexte provider
                            stateStyle = {deviceStatus} // Pour le style
                            />
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default ControlCards;